package DabuOps.tikkle.category.service;

import DabuOps.tikkle.category.entity.Category;
import DabuOps.tikkle.category.repogitory.CategoryRepository;
import DabuOps.tikkle.global.exception.BusinessLogicException;
import DabuOps.tikkle.global.exception.ExceptionCode;
import DabuOps.tikkle.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class CategoryService {
    private final MemberService memberService;
    private final CategoryRepository categoryRepository;

    public Category createCategory(Category category) {
        // 존재하는 회원인지 검증
        // Member member = memberService.findVerifiedMember(category.getMemberId());

        return categoryRepository.save(category);
    }

    public Category updateCategory(Category category) {
        Category updatedCategory = findCategory(category.getCategoryId());

        Optional.ofNullable(category.getName())
                .ifPresent(name -> updatedCategory.setName(name));
        Optional.ofNullable(category.getBudget())
                .ifPresent(budget -> updatedCategory.setBudget(budget));

        return categoryRepository.save(updatedCategory);
    }

    public Category findCategory(long categoryId) {
        Optional<Category> optionalCategory = categoryRepository.findById(categoryId);

        Category findCategory =
                optionalCategory.orElseThrow(() ->
                        new BusinessLogicException(ExceptionCode.CATEGORY_NOT_FOUND));

        return findCategory;
    }

    public List<Category> findCategories() {
        List<Category> categories = categoryRepository.findCategories();

        return categories;
    }

    public void deleteCategory(long categoryId) {
        Category category = findCategory(categoryId);

        categoryRepository.delete(category);
    }
}
