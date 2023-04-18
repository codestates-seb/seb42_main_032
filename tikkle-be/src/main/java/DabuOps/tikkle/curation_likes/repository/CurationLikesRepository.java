package DabuOps.tikkle.curation_likes.repository;

import DabuOps.tikkle.curation_likes.entity.CurationLikes;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CurationLikesRepository extends JpaRepository<CurationLikes, Long> {
    Optional<CurationLikes> findByMemberIdAndCurationId(Long memberId, Long curationId);
}
