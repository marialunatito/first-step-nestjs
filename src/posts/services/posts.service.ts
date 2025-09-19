import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostDto } from '../dto/create-post.dto';
import { UpdatePostDto } from '../dto/update-post.dto';
import { Post } from '../entities/post.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
  ) {}

  async create(createPostDto: CreatePostDto, userId: number) {
    try {
      return await this.postsRepository
        .save({
          ...createPostDto,
          // como lo tengo en la entidad : lo que tengo en el dto
          user: { id: userId },
          // entity : dto
          categories: createPostDto.categoryIds?.map((id) => ({ id })),
        })
        .catch();
    } catch {
      throw new BadRequestException(`Error creating post`);
    }
  }

  findAll() {
    return this.postsRepository.find({
      relations: ['user.profile', 'categories'],
    });
  }

  async findOne(id: number) {
    const posts = await this.postsRepository.findOne({
      where: { id },
      relations: ['user.profile', 'categories'],
    });
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

  async getPostsByCategoryId(categoryId: number) {
    const posts = await this.postsRepository.find({
      where: { categories: { id: categoryId } },
    });

    return posts;
  }
}
