import { Controller, Param, Body, Get, Post, Put, Delete } from "routing-controllers";
import { injectable } from "inversify";

@injectable()
@Controller()
export class UserController {

    @Get("/users")
    getAll() {
        return "This action returns all users";
    }

    @Get("/users/:id")
    getOne(@Param("id") id: number) {
        return "This action returns user #" + id;
    }

    @Post("/users")
    post(@Body() _user: any) {
        return "Saving user...";
    }

    @Put("/users/:id")
    put(@Param("id") _id: number, @Body() _user: any) {
        return "Updating a user...";
    }

    @Delete("/users/:id")
    remove(@Param("id") _id: number) {
        return "Removing user...";
    }

}