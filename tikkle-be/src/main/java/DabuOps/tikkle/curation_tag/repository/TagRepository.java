package DabuOps.tikkle.curation_tag.repository;

import DabuOps.tikkle.curation_tag.entity.Tag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TagRepository extends JpaRepository<Tag,Long> {

}
