package DabuOps.tikkle.category;

import DabuOps.tikkle.category.entity.Category;
import DabuOps.tikkle.category.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PatchMapping;
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
                .name("쇼핑")
                .avgBudget(0)
                .image("AiOutlineShopping")
                .build();
        Category category2 = Category.builder()
                .id(2)
                .name("식비")
                .avgBudget(0)
                .image("MdFastfood")
                .build();
        Category category3 = Category.builder()
                .id(3)
                .name("카페/간식")
                .avgBudget(0)
                .image("BiCoffeeTogo")
                .build();
        Category category4 = Category.builder()
                .id(4)
                .name("오락")
                .avgBudget(0)
                .image("IoLogoGameControllerA")
                .build();
        Category category5 = Category.builder()
                .id(5)
                .name("술/유흥")
                .avgBudget(0)
                .image("IoBeer")
                .build();
        Category category6 = Category.builder()
                .id(6)
                .name("건강")
                .avgBudget(0)
                .image("MdOutlineLocalHospital")
                .build();
        Category category7 = Category.builder()
                .id(7)
                .name("여행")
                .avgBudget(0)
                .image("GiAirplaneDeparture")
                .build();
        Category category8 = Category.builder()
                .id(8)
                .name("미용")
                .avgBudget(0)
                .image("GiLipstick")
                .build();
        Category category9 = Category.builder()
                .id(9)
                .name("금융")
                .avgBudget(0)
                .image("BiWon")
                .build();
        Category category10 = Category.builder()
                .id(10)
                .name("자동차")
                .avgBudget(0)
                .image("BsFillCarFrontFill")
                .build();
        Category category11 = Category.builder()
                .id(11)
                .name("대중교통")
                .avgBudget(0)
                .image("IoIosSubway")
                .build();
        Category category12 = Category.builder()
                .id(12)
                .name("주거")
                .avgBudget(0)
                .image("BsFillHouseFill")
                .build();
        Category category13 = Category.builder()
                .id(13)
                .name("경조사")
                .avgBudget(0)
                .image("GiPresent")
                .build();
        Category category14 = Category.builder()
                .id(14)
                .name("통신")
                .avgBudget(0)
                .image("BiPhoneCall")
                .build();
        Category category15 = Category.builder()
                .id(15)
                .name("생활")
                .avgBudget(0)
                .image("BsCart4")
                .build();
        Category category16 = Category.builder()
                .id(16)
                .name("자녀/육아")
                .avgBudget(0)
                .image("FaBabyCarriage")
                .build();
        Category category17 = Category.builder()
                .id(17)
                .name("교육")
                .avgBudget(0)
                .image("IoMdSchool")
                .build();
        Category category18 = Category.builder()
                .id(18)
                .name("반려동물")
                .avgBudget(0)
                .image("FaDog")
                .build();
        Category category19 = Category.builder()
                .id(19)
                .name("문화생활")
                .avgBudget(0)
                .image("BiCameraMovie")
                .build();
        Category category20 = Category.builder()
                .id(20)
                .name("운동")
                .avgBudget(0)
                .image("CiDumbbell")
                .build();
        Category category21 = Category.builder()
                .id(21)
                .name("기타")
                .avgBudget(0)
                .image("AiOutlineQuestion")
                .build();
        categoryRepository.save(category1);
        categoryRepository.save(category2);
        categoryRepository.save(category3);
        categoryRepository.save(category4);
        categoryRepository.save(category5);
        categoryRepository.save(category6);
        categoryRepository.save(category7);
        categoryRepository.save(category8);
        categoryRepository.save(category9);
        categoryRepository.save(category10);
        categoryRepository.save(category11);
        categoryRepository.save(category12);
        categoryRepository.save(category13);
        categoryRepository.save(category14);
        categoryRepository.save(category15);
        categoryRepository.save(category16);
        categoryRepository.save(category17);
        categoryRepository.save(category18);
        categoryRepository.save(category19);
        categoryRepository.save(category20);
        categoryRepository.save(category21);
    }

    public Category findCategory(Long categoryId) {
        Optional<Category> category = categoryRepository.findById(categoryId);
        Category findCategory =
                category.get();
        return findCategory;
    }
}
