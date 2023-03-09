package DabuOps.tikkle.category.repogitory;

import DabuOps.tikkle.category.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {
    @Query(value = "SELECT * FROM CATEGORY WHERE CATEGORY.CATEGORY_STATUS <> 'CATEGORY_INACTIVE'", nativeQuery = true)
    List<Category> findCategories();
}
