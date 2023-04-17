package DabuOps.tikkle.curation_like_up.repository;

import DabuOps.tikkle.curation_like_up.entity.CurationLikeUp;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CurationLikeUpRepository extends JpaRepository<CurationLikeUp, Long> {
    Optional<CurationLikeUp> findByMemberIdAndCurationId(Long memberId, Long curationId);
}
