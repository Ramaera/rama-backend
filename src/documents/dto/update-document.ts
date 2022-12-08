import { InputType,Field } from "@nestjs/graphql";

@InputType()
export class UpdateDocumentsInput{
    @Field({nullable:true})
    title?:string;

    @Field({nullable:true})
    url?:string;
    
}