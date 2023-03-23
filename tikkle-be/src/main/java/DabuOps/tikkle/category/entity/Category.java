package DabuOps.tikkle.category.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@Entity
@NoArgsConstructor
@Builder
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "NAME")
    private String name;

    @Column(name = "AVG_BUDGET")
    private int avgBudget; // 사용자끼리 예산 비교

    @Column(name = "IMAGE")
    private String image;

    @Builder
    public Category(long id, String name, int avgBudget, String image) {
        this.id = id;
        this.name = name;
        this.avgBudget = avgBudget;
        this.image = image;
    }
}
