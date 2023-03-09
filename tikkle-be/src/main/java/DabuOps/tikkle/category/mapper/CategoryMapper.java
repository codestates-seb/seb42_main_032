package DabuOps.tikkle.category.mapper;

import DabuOps.tikkle.category.dto.CategoryDto;
import DabuOps.tikkle.category.entity.Category;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface CategoryMapper {
    Category categoryPostDtoToCategory(CategoryDto.Post requestBody);
    Category categoryPatchDtoToCategory(CategoryDto.Patch requestBody);
    CategoryDto.Response categoryToCategoryResponseDto(Category category);
    List<CategoryDto.Response> categoriesToCategoryResponseDto(List<Category> categories);
}
