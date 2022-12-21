import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { UpdateDocumentsInput } from './dto/update-document';

@Injectable()
export class DocumentsService{
    constructor( private prisma:PrismaService){}
    // *****************************************
    // *******************************************
    // **********Update Documents*****************
    // *******************************************
    
    async updateDocuments(documentId:string,data:UpdateDocumentsInput){
        return this.prisma.document.update({
            data,
            where:{
                id:documentId,
            },
        })
    }
    
}