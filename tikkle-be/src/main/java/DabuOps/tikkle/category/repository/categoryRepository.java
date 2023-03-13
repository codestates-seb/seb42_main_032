package DabuOps.tikkle.category.repository;

import DabuOps.tikkle.category.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface categoryRepository extends JpaRepository<Category, Long> {
}
