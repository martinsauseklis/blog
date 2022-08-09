import { Controller, Post, Body, UseGuards, Request, Get, Query, Param } from '@nestjs/common';
import { from, Observable } from 'rxjs';
import { JwtAuthGuard } from 'src/auth/guards/jwt-guard';
import { BlogEntry } from '../model/blog-entry.interface';
import { BlogService } from '../service/blog.service';

@Controller('blogs')
export class BlogController {
    constructor(private blogService: BlogService) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Body() blogEntry: BlogEntry, @Request() req): Observable<BlogEntry> {
        const user = req.user.user;
        return this.blogService.create(user, blogEntry)
    }

    
    @Get()
    findBlogEntries(@Query('userId') userId: number): Observable<BlogEntry[]> {
        if (userId == null) {
            return this.blogService.findAll();
        } else {
            return this.blogService.findByUser(userId);
        }
    }

    @Get(':id')
    findOne(@Param('id') id: number ): Observable<BlogEntry> {
        return this.blogService.findOne(id)
    }
}
