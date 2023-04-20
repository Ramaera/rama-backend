import { InputType,Field, registerEnumType } from "@nestjs/graphql";
import { STATUS } from "@prisma/client";

@InputType()
export class UpdateDocumentsInput{

    @Field()
    id:string;
    
    @Field({nullable:true})
    title?:string;

    @Field({nullable:true})
    url?:string;
    
}


@InputType()
export class UpdateDocumentStatusByAdmin{

    @Field()
    id:string

    @Field(()=>STATUS)
    status : STATUS;

}

registerEnumType(STATUS, {
    name: 'STATUS',
});