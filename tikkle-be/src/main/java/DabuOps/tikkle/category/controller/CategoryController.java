package DabuOps.tikkle.category.controller;

import DabuOps.tikkle.category.dto.CategoryDto;
import DabuOps.tikkle.category.entity.Category;
import DabuOps.tikkle.category.mapper.CategoryMapper;
import DabuOps.tikkle.category.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/categories")
@Validated
@RequiredArgsConstructor
public class CategoryController {
    private final CategoryMapper categoryMapper;
    private final CategoryService categoryService;

    @PostMapping("/{member_id}")
    public ResponseEntity postCategory(@PathVariable("member_id") long memberId,
                                       @RequestBody @Valid CategoryDto.Post requestBody) {
        Category category = categoryMapper.categoryPostDtoToCategory(requestBody);
        category.setMemberId(memberId);
        Category createdCategory = categoryService.createCategory(category);

        return new ResponseEntity<>(createdCategory, HttpStatus.CREATED);
    }

    @PatchMapping("/{category_id}")
    public ResponseEntity patchCategory(@PathVariable("category_id") long categoryId,
                                        @RequestBody @Valid CategoryDto.Patch requestBody) {
        Category category = categoryMapper.categoryPatchDtoToCategory(requestBody);
        category.setCategoryId(categoryId);

        Category updatedCategory = categoryService.updateCategory(category);
        return new ResponseEntity<>(updatedCategory, HttpStatus.OK);
    }

    @GetMapping("/{category_id}")
    public ResponseEntity getCategory(@PathVariable("category_id") long categoryId) {
        Category category = categoryService.findCategory(categoryId);
        CategoryDto.Response response = categoryMapper.categoryToCategoryResponseDto(category);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity getCategories() {
        List<Category> categories = categoryService.findCategories();
        List<CategoryDto.Response> responses = categoryMapper.categoriesToCategoryResponseDto(categories);

        return new ResponseEntity<>(responses, HttpStatus.OK);
    }

    @DeleteMapping("/{category_id}")
    public ResponseEntity deleteCategory(@PathVariable("category_id") long categoryId) {
        categoryService.deleteCategory(categoryId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
