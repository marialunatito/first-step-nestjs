import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
  ) {}

  async create(createPostDto: CreatePostDto) {
    try {
      return await this.postsRepository
        .save({
          ...createPostDto,
          user: { id: createPostDto.userId },
        })
        .catch();
    } catch {
      throw new BadRequestException(`Error creating post`);
    }
  }

  findAll() {
    return this.postsRepository.find();
  }

  async findOne(id: number) {
    const posts = await this.postsRepository.findOneBy({ id });
    if (!posts) {
      throw new NotFoundException(`Post ${id} not found`);
    }

    return posts;
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    try {
      const post = await this.postsRepository.findOneBy({ id });

      if (!post) {
        throw new NotFoundException(`Post ${id} not found`);
      }

      const postMerge = this.postsRepository.merge(post, updatePostDto);
      const savePost = await this.postsRepository.save(postMerge);
      return savePost;
    } catch {
      throw new BadRequestException(`Error update post`);
    }
  }

  deleted(id: number) {
    return this.postsRepository.delete({ id });
  }
}
