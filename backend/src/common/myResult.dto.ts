import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class MyResult {
  @Field()
  success: boolean;
  // Adicione mais campos conforme necessário
}