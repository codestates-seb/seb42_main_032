package DabuOps.tikkle.category;

import DabuOps.tikkle.category.entity.Category;
import DabuOps.tikkle.category.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RequiredArgsConstructor
@RestController
@RequestMapping("/init")
public class CategoryService {
    private final CategoryRepository categoryRepository;

    @PostMapping
    public void createCategory() { // 임시 카테고리
        Category category1 = Category.builder()
                .id(1)
                .name("식비")
                .avgBudget(0)
                .build();
        Category category2 = Category.builder()
                .id(2)
                .name("차비")
                .avgBudget(0)
                .build();
        Category category3 = Category.builder()
                .id(3)
                .name("유흥비")
                .avgBudget(0)
                .build();
        Category category4 = Category.builder()
                .id(4)
                .name("기타")
                .avgBudget(0)
                .build();
        categoryRepository.save(category1);
        categoryRepository.save(category2);
        categoryRepository.save(category3);
        categoryRepository.save(category4);
    }

    public Category findCategory(Long categoryId) {
        Optional<Category> category = categoryRepository.findById(categoryId);
        Category findCategory =
                category.get();
        return findCategory;
    }
}
