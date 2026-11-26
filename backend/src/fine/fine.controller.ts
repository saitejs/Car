import { Body, Controller, Get, Param, Post, UploadedFile, UseInterceptors, } from "@nestjs/common";
import { FineService } from "./fine.service";
import {
  FileInterceptor,

} from "@nestjs/platform-express";

import {
  diskStorage,

} from "multer";

import {
  extname,

} from "path";

import type { Express } from "express";

@Controller('fine')
export class FineController {
  constructor(private fineService: FineService) { }

  // ✅ Create Fine
  @Post()

  @UseInterceptors(

    FileInterceptor(

      "photo",

      {

        storage: diskStorage({

          destination: "./uploads",

          filename: (
            req,
            file,
            cb
          ) => {

            const unique =
              Date.now();

            cb(

              null,

              unique +
              extname(
                file.originalname
              )
            );
          },
        }),
      }
    )
  )

  create(

    @UploadedFile()
    file: Express.Multer.File,

    @Body()
    body: any
  ) {

    return this.fineService.createFine({

      ...body,

      evidencePhoto:
        file
          ? file.filename
          : null,
    });
  }

  // ✅ All fines
  @Get()
  getAll() {
    return this.fineService.getAllFines();
  }

  // ✅ User fines
  @Get('user/:userId')
  getUserFines(@Param('userId') userId: string) {
    return this.fineService.getUserFines(Number(userId));
  }

  @Get('stats/:officerId')
  getOfficerStats(
    @Param('officerId') officerId: string
  ) {
    return this.fineService.getOfficerStats(
      Number(officerId)
    );
  }

  @Post('pay/:id')
  payFine(@Param('id') id: string) {
    return this.fineService.payFine(Number(id));
  }
}