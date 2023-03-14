package DabuOps.tikkle.category.repository;

import DabuOps.tikkle.category.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository

public interface categoryRepository extends JpaRepository<Category, Long> {
}
