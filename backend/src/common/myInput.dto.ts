import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class MyInput {
  @Field()
  exampleField: string;
  // Adicione mais campos conforme necessário
}