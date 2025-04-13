import { FC } from "react";
import { graphql } from "../ggl";
import { useMutation } from "@apollo/client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import styles from "./UserCreateInput.module.css";
import { useNavigate } from "react-router";

const createUserMutationDocument = graphql(`
  mutation CreateUser($createUserInput: CreateUserInput!) {
    createUser(createUserInput: $createUserInput) {
      id
      email
      firstName
      lastName
    }
  }
`)

const createUserSchema = z.object({
  email: z.string().email("有効なメールアドレスを入力してください"),
  firstName: z.string().min(2, { message: '名前は2文字以上で入力してください' }).max(55, { message: '名前は55文字以内で入力してください' }),
  lastName: z.string().min(2, { message: '苗字は2文字以上で入力してください' }).max(55, { message: '苗字は55文字以内で入力してください' }),
})
type CreateUserInputType = z.infer<typeof createUserSchema>

const UserCreateInput: FC = () => {
  const navigate = useNavigate()
  const [createUser] = useMutation(createUserMutationDocument, {
    onCompleted: () => {
      alert("ユーザーを作成しました")
      navigate("/user")
    },
    onError: (error) => {
      alert("ユーザ登録に失敗しました。" + error.message)
    }
  })

  const { register, handleSubmit, formState: { errors } } = useForm<CreateUserInputType>({
    resolver: zodResolver(createUserSchema),
  })

  const onSubmit = (data: CreateUserInputType) => {
    createUser({ variables: { createUserInput: data } })
  }

  return (
    <div>
      <h1>ユーザー作成画面</h1>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.formWrapper}>
        <div className={styles.inputWrapper}>
          <label htmlFor="email">メールアドレス</label>
          <input {...register("email")} type="text" id="email" placeholder="メールアドレス" />
        </div>
        {errors.email && <p className={styles.errorMessage}>{errors.email.message}</p>}
        <div className={styles.inputWrapper}>
          <label htmlFor="firstName">名前</label>
          <input {...register("firstName")} type="text" id="firstName" placeholder="名前" />
        </div>
        {errors.firstName && <p className={styles.errorMessage}>{errors.firstName.message}</p>}
        <div className={styles.inputWrapper}>
          <label htmlFor="lastName">苗字</label>
          <input {...register("lastName")} type="text" id="lastName" placeholder="苗字" />
        </div>
        {errors.lastName && <p className={styles.errorMessage}>{errors.lastName.message}</p>}
        <button type="submit" className={styles.button}>作成</button>
      </form>
    </div>
  )
}

export default UserCreateInput
