package DabuOps.tikkle.curation.entity;

import DabuOps.tikkle.curation_tag.entity.Tag;
import DabuOps.tikkle.global.audit.Auditable;
import DabuOps.tikkle.member_category.entity.MemberCategory;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

public class Curation extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String content;

    @ManyToOne
    @JoinColumn(name = "TAG_ID")
    private Tag tag;

}
