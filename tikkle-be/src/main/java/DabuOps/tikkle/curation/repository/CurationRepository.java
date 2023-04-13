package DabuOps.tikkle.curation.repository;

import DabuOps.tikkle.curation.entity.Curation;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CurationRepository extends JpaRepository<Curation, Long> {
    Page<Curation> findByTitleContains(String keyword, Pageable pageable);

    Page<Curation> findByTag_NameContaining(String keyword, Pageable pageable);

    Page<Curation> findByTitleContainingOrTag_NameContaining(String keyword, String keyword2, Pageable pageable);

    List<Curation> findAllByTagId(Long tagId);
}
