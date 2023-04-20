import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import {  UpdateDocumentStatusByAdmin, UpdateDocumentsInput } from './dto/update-document';

@Injectable()
export class DocumentsService{
    constructor( private prisma:PrismaService){}
    // *****************************************
    // *******************************************
    // **********Update Documents*****************
    // *******************************************
    
    async updateDocuments(data:UpdateDocumentsInput){
        return this.prisma.document.update({
            data,
            where:{
                id:data.id,
            },
        })
    }

    async updateDocumentStatusByAdmin(data:UpdateDocumentStatusByAdmin){
        return this.prisma.document.update({
            data,
            where:{
                id:data.id,
            },
        })
    }
    
}