import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { UpdateCategoryDto } from '../dto/update-category.dto';
import { Category } from '../entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    try {
      return await this.categoriesRepository.save(createCategoryDto).catch();
    } catch {
      throw new BadRequestException(`Error creating post`);
    }
  }

  findAll() {
    return this.categoriesRepository.find();
  }

  async findOne(id: number) {
    const categories = await this.categoriesRepository.findOneBy({ id });
    if (!categories) {
      throw new NotFoundException(`Category ${id} not found`);
    }

    return categories;
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    try {
      const post = await this.categoriesRepository.findOneBy({ id });

      if (!post) {
        throw new NotFoundException(`Category ${id} not found`);
      }

      const postMerge = this.categoriesRepository.merge(post, updateCategoryDto);
      const saveCategory = await this.categoriesRepository.save(postMerge);
      return saveCategory;
    } catch {
      throw new BadRequestException(`Error update post`);
    }
  }

  deleted(id: number) {
    return this.categoriesRepository.delete({ id });
  }
}
