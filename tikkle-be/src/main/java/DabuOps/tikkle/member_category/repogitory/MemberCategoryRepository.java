package DabuOps.tikkle.member_category.repogitory;

import DabuOps.tikkle.member_category.entity.MemberCategory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MemberCategoryRepository extends JpaRepository<MemberCategory, Long> {
    List<MemberCategory> findAllMemberCategoriesByMemberId(Long memberId);
}
