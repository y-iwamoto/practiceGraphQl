import { useMutation, useQuery } from "@apollo/client";
import { FC } from "react";
import { useNavigate } from "react-router";
import { z } from "zod";
import { graphql } from "../ggl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormInput } from "../ui/form/FormInput";
import { getUsersQueryDocument } from "../graphql/queries/user";
import styles from "./FarmCreateInput.module.css";
import { FormSelect } from "../ui/form/FormSelect";
import { SubmitButton } from "../ui/button/SubmitButton";

const createFarmMutationDocument = graphql(`
  mutation CreateFarm($createFarmInput: CreateFarmInput!) {
    createFarm(createFarmInput: $createFarmInput) {
      id
      name
      postalCode
      prefecture
      city
      restAddress
      building
      owner {
        id
        email
        firstName
        lastName
      }
    }
  }
`)

const createFarmSchema = z.object({
  name: z.string()
    .min(1, { message: '名前を入力してください' })
    .max(55, { message: '名前は55文字以内で入力してください' }),
  postalCode: z.string()
    .min(1, { message: '郵便番号を入力してください' })
    .max(7, { message: '郵便番号は7文字以内で入力してください' })
    .regex(/^\d{7}$/, { message: '郵便番号は数字7桁で入力してください' }),
  prefecture: z.string()
    .min(1, { message: '都道府県を入力してください' })
    .max(20, { message: '都道府県は20文字以内で入力してください' }),
  city: z.string()
    .min(1, { message: '市区町村を入力してください' })
    .max(100, { message: '市区町村は100文字以内で入力してください' }),
  restAddress: z.string()
    .min(1, { message: 'その他の住所を入力してください' })
    .max(100, { message: 'その他の住所は100文字以内で入力してください' }),
  building: z.string()
    .max(55, { message: '建物名は55文字以内で入力してください' }),
  ownerId: z.string()
    .nonempty({ message: '所有者を選択してください' })
})
type CreateFarmInputType = z.infer<typeof createFarmSchema>

const FarmCreateInput: FC = () => {
  const navigate = useNavigate()
  const { data } = useQuery(getUsersQueryDocument)

  const [createFarm, { loading }] = useMutation(createFarmMutationDocument, {
    onCompleted: () => {
      alert("農場を作成しました")
      navigate("/farm")
    },
    onError: (error) => {
      alert("農場作成に失敗しました。" + error.message)
    }
  })

  const { register, handleSubmit, setValue, formState: { errors } } = useForm<CreateFarmInputType>({
    resolver: zodResolver(createFarmSchema),
    mode: "onBlur",
    defaultValues: {
      name: "",
      postalCode: "",
      prefecture: "",
      city: "",
      restAddress: "",
      building: "",
      ownerId: "",
    }
  })

  const onSubmit = (data: CreateFarmInputType) => {
    createFarm({
      variables: {
        createFarmInput: {
          ...data,
          ownerId: parseInt(data.ownerId, 10)
        }
      }
    })
  }

  return (
    <div>
      <h1>農場作成画面</h1>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.formWrapper}>
        <FormInput<CreateFarmInputType>
          label="農場の名前"
          name="name"
          register={register}
          type="text"
          placeholder="ABC農場"
          error={errors.name}
        />
        <FormInput<CreateFarmInputType>
          label="郵便番号"
          name="postalCode"
          register={register}
          type="number"
          placeholder="1234567"
          error={errors.postalCode}
          registerOptions={{
            onBlur: async (e) => {
              const value = e.target.value
              if (value.length === 7) {
                const res = await fetch(`https://zipcloud.ibsnet.co.jp/api/search?zipcode=${value}`);
                const json = await res.json();
                const result = json.results?.[0];
                if (result) {
                  setValue("prefecture", result.address1);
                  setValue("city", result.address2);
                  setValue("restAddress", result.address3);
                }
              }
            }
          }}
        />
        <FormInput<CreateFarmInputType>
          label="都道府県"
          name="prefecture"
          register={register}
          type="text"
          placeholder="東京都"
          error={errors.prefecture}
        />
        <FormInput<CreateFarmInputType>
          label="市区町村"
          name="city"
          register={register}
          type="text"
          placeholder="千代田区"
          error={errors.city}
        />
        <FormInput<CreateFarmInputType>
          label="その他の住所"
          name="restAddress"
          register={register}
          type="text"
          placeholder="2丁目3番11号"
          error={errors.restAddress}
        />
        <FormInput<CreateFarmInputType>
          label="建物名"
          name="building"
          register={register}
          type="text"
          placeholder="田中第一ビル"
          error={errors.building}
        />
        <FormSelect<CreateFarmInputType>
          label="所有者"
          name="ownerId"
          register={register}
          options={
            data?.users.map((user) => (
              { value: user.id, label: `${user.lastName} ${user.firstName}` }
            )) || []
          }
          placeholder="所有者を選択してください"
          error={errors.ownerId}
        />

        <SubmitButton
          loading={loading}
        >
          作成
        </SubmitButton>
      </form>
    </div>
  )
}

export default FarmCreateInput