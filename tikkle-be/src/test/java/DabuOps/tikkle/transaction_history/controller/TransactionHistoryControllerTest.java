package DabuOps.tikkle.transaction_history.controller;

import DabuOps.tikkle.member_category.controller.MemberCategoryController;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.jpa.mapping.JpaMetamodelMappingContext;
import org.springframework.security.test.context.support.WithMockUser;

@WebMvcTest(MemberCategoryController.class)
@AutoConfigureRestDocs
@MockBean(JpaMetamodelMappingContext.class)
@WithMockUser(username = "kimconding@gmail.com", roles = {"USER"})
public class TransactionHistoryControllerTest {
}
