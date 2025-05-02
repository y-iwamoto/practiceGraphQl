import { z } from "zod";
import { graphql } from "../ggl";
import { FC, useCallback, useMemo } from "react";
import { useNavigate } from "react-router";
import { useMutation, useQuery } from "@apollo/client";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormInput } from "../ui/form/FormInput";
import { FormSelect } from "../ui/form/FormSelect";

const createOrderMutationDocument = graphql(`
  mutation CreateOrder($createOrderInput: CreateOrderInput!) {
    createOrder(createOrderInput: $createOrderInput) {
      id
      orderedAt
      status
      buyer {
        id
        firstName
        lastName
        email
      }
      farm {
        id
        name
      }
      orderDetails {
        id
        amount
        produceItem {
          id
          name
        }
      }
    }
  }
`)

const getFarmRelatedItemQueryDocument = graphql(`
  query GetFarmRelatedItem($farmId: Float!) {
    farm(id: $farmId) {
      id
      name
      produceItems {
        id
        name
        produceStock {
          id
          amount
        }
      }
    }
  }
`)

const createOrderSchema = z.object({
  produceItems: z.array(
    z.object({
      amount: z.coerce.number()
        .refine((val) => !isNaN(val), {
          message: '注文数は数値で入力してください',
        })
        .refine((val) => val >= 1, {
          message: '注文数は1以上で入力してください',
        }),
      produceItemId: z.coerce.number().min(1, { message: '生産物IDは1以上で入力してください' }),
    })
  ),
})

type CreateOrderInputType = z.output<typeof createOrderSchema>

const OrderCreateInput: FC = () => {
  const farmId = 1; // TODO: farmIdを動的に取得するように変更する
  const navigate = useNavigate();

  const { data, loading, error } = useQuery(getFarmRelatedItemQueryDocument, {
    variables: { farmId: farmId }, // TODO: farmIdを動的に取得するように変更する
    onError: (error) => {
      console.error("Error fetching farm data:", error)
    }
  })

  // TODO: 自分のfarmIDを決めうちでリクエストしないと今はいけないかも
  const [createOrder] = useMutation(createOrderMutationDocument, {
    onCompleted: (data) => {
      console.log("Order created successfully:", data)
      navigate("/orders")
    },
    onError: (error) => {
      console.error("Error creating order:", error)
    }
  })


  const { register, control, handleSubmit, formState: { errors }, watch } = useForm<CreateOrderInputType>({
    resolver: zodResolver(createOrderSchema),
    mode: "onBlur",
    defaultValues: {
      produceItems: [
        { amount: 1 },
      ]
    },
  })

  const produceItems = watch("produceItems")

  const { fields, append, remove } = useFieldArray({
    control,
    name: "produceItems",
  })

  const getMaxStock = useCallback((produceItemId: number | undefined) => {
    const selectedItem = data?.farm?.produceItems?.find(item => item.id === produceItemId)
    return selectedItem?.produceStock?.amount || 0;
  }, [data?.farm?.produceItems]);

  const maxStocks = useMemo(() =>
    fields.map((_, index) => getMaxStock(produceItems[index]?.produceItemId)),
    [fields, produceItems, getMaxStock]
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const onSubmit: SubmitHandler<CreateOrderInputType> = (data) => {
    createOrder({
      variables: {
        createOrderInput: {
          farmId: farmId,
          produceItems: data.produceItems.map(item => ({
            amount: item.amount,
            produceItemId: item.produceItemId,
          })),
        },
      },
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {fields.map((item, index) => {
        return (
          <div key={item.id}>
            <FormSelect<CreateOrderInputType>
              label="生産物"
              name={`produceItems.${index}.produceItemId`}
              register={register}
              options={(data?.farm?.produceItems ?? []).map((produceItem) => ({
                value: produceItem.id.toString(),
                label: produceItem.name,
              }))}
              error={errors.produceItems?.[index]?.produceItemId}
              placeholder="生産物を選択してください"
            />
            <FormInput<CreateOrderInputType>
              label="注文数"
              name={`produceItems.${index}.amount`}
              register={register}
              type="number"
              placeholder="1"
              min={1}
              max={maxStocks[index]}
              error={errors.produceItems?.[index]?.amount}
            />
            <button type="button" onClick={() => remove(index)}>
              削除
            </button>

          </div>
        )
      })}
      {(data?.farm?.produceItems && data?.farm?.produceItems.length > 0) && (
        <button type="button" onClick={() => append({ amount: 1, produceItemId: data?.farm?.produceItems[0]?.id })}>
          追加
        </button>
      )}
      <button type="submit">
        注文を作成
      </button>
    </form>
  )

}

export default OrderCreateInput
