package DabuOps.tikkle.member_category.repository;

import DabuOps.tikkle.member_category.entity.MemberCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MemberCategoryRepository extends JpaRepository<MemberCategory, Long> {
    List<MemberCategory> findAllByMemberIdAndStatusNot(Long memberId, MemberCategory.Status status);

}
