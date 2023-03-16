//package DabuOps.tikkle.transaction_history.controller;
//
//import DabuOps.tikkle.category.entity.Category;
//import DabuOps.tikkle.member.entity.Member;
//import DabuOps.tikkle.member_category.controller.MemberCategoryController;
//import DabuOps.tikkle.member_category.dto.MemberCategoryDto;
//import DabuOps.tikkle.member_category.entity.MemberCategory;
//import DabuOps.tikkle.member_category.mapper.MemberCategoryMapper;
//import DabuOps.tikkle.member_category.repository.MemberCategoryRepository;
//import DabuOps.tikkle.member_category.service.MemberCategoryService;
//import DabuOps.tikkle.transaction_history.dto.TransactionHistoryDto;
//import DabuOps.tikkle.transaction_history.entity.TransactionHistory;
//import DabuOps.tikkle.transaction_history.mapper.TransactionHistoryMapper;
//import DabuOps.tikkle.transaction_history.repository.TransactionHistoryRepository;
//import DabuOps.tikkle.transaction_history.service.TransactionHistoryService;
//import com.google.gson.Gson;
//import org.junit.jupiter.api.DisplayName;
//import org.junit.jupiter.api.Test;
//import org.mockito.Mockito;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
//import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
//import org.springframework.boot.test.mock.mockito.MockBean;
//import org.springframework.data.jpa.mapping.JpaMetamodelMappingContext;
//import org.springframework.http.HttpHeaders;
//import org.springframework.http.MediaType;
//import org.springframework.restdocs.payload.JsonFieldType;
//import org.springframework.security.test.context.support.WithMockUser;
//import org.springframework.test.web.servlet.MockMvc;
//import org.springframework.test.web.servlet.ResultActions;
//
//import java.time.LocalDate;
//import java.time.LocalDateTime;
//import java.time.LocalTime;
//
//import static org.mockito.BDDMockito.given;
//import static org.springframework.restdocs.headers.HeaderDocumentation.headerWithName;
//import static org.springframework.restdocs.headers.HeaderDocumentation.responseHeaders;
//import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
//import static org.springframework.restdocs.operation.preprocess.Preprocessors.*;
//import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
//import static org.springframework.restdocs.payload.PayloadDocumentation.requestFields;
//import static org.springframework.restdocs.snippet.Attributes.attributes;
//import static org.springframework.restdocs.snippet.Attributes.key;
//import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
//import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
//
//@WebMvcTest(TransactionHistoryController.class)
//@AutoConfigureRestDocs
//@MockBean(JpaMetamodelMappingContext.class)
//@WithMockUser(username = "kimconding@gmail.com", roles = {"USER"})
//public class TransactionHistoryControllerTest {
//    String BASE_URL = "/transaction_histories";
//
//    Member member = Member.builder()
//            .id(1L)
//            .email("test@gmail.com")
//            .name("홍길동")
//            .state(Member.MemberState.ACTIVE)
//            .payDay(25)
//            .initDate(15)
//            .gender(Member.Gender.male)
//            .location("seoul")
//            .build();
//
//    Category category = Category.builder()
//            .id(1L)
//            .name("밥")
//            .build();
//
//    MemberCategory memberCategory1 = MemberCategory.builder()
//            .id(1L)
//            .member(member)
//            .category(category)
//            .name("배달")
//            .status(MemberCategory.Status.ACTIVE)
//            .build();
//
//    TransactionHistory transactionHistory1 = TransactionHistory.builder()
//            .id(1L)
//            .memberCategory(memberCategory1)
//            .date(LocalDate.parse("2023-03-13"))
//            .time(LocalTime.now())
//            .amount(10000)
//            .inoutType(TransactionHistory.InoutType.SPEND)
//            .memo("숙취해소제")
//            .branchName("GS25")
//            .status(TransactionHistory.Status.ACTIVE)
//            .build();
//
//    TransactionHistory transactionHistory2 = TransactionHistory.builder()
//            .id(2L)
//            .memberCategory(memberCategory1)
//            .date(LocalDate.parse("2023-03-14"))
//            .time(LocalTime.now())
//            .amount(20000)
//            .inoutType(TransactionHistory.InoutType.SPEND)
//            .memo("숙취해소제")
//            .branchName("CU")
//            .status(TransactionHistory.Status.ACTIVE)
//            .build();
//
//    TransactionHistoryDto.Post post = TransactionHistoryDto.Post.builder()
//            .memberCategoryId(1L)
//            .date(LocalDate.now())
//            .time(LocalTime.now())
//            .inoutType(TransactionHistory.InoutType.SPEND)
//            .memo("아하하")
//            .amount(50000)
//            .branchName("세븐일레븐")
//            .build();
//
//    TransactionHistoryDto.Patch patch = TransactionHistoryDto.Patch.builder()
//            .memberCategoryId(1L)
//            .date(LocalDate.now())
//            .time(LocalTime.now())
//            .memo("수정")
//            .amount(25000)
//            .branchName("중앙대")
//            .build();
//
//    TransactionHistoryDto.Response response1 = TransactionHistoryDto.Response.builder()
//            .id(transactionHistory1.getId())
//            .memberCategoryId(transactionHistory1.getMemberCategory().getId())
//            .date(transactionHistory1.getDate())
//            .time(transactionHistory1.getTime())
//            .inoutType(transactionHistory1.getInoutType())
//            .memo(transactionHistory1.getMemo())
//            .amount(transactionHistory1.getAmount())
//            .branchName(transactionHistory1.getBranchName())
//            .build();
//
//    TransactionHistoryDto.Response response2 = TransactionHistoryDto.Response.builder()
//            .id(transactionHistory2.getId())
//            .memberCategoryId(transactionHistory2.getMemberCategory().getId())
//            .date(transactionHistory2.getDate())
//            .time(transactionHistory2.getTime())
//            .inoutType(transactionHistory2.getInoutType())
//            .memo(transactionHistory2.getMemo())
//            .amount(transactionHistory2.getAmount())
//            .branchName(transactionHistory2.getBranchName())
//            .build();
//
//    @Autowired
//    MockMvc mockMvc;
//    @MockBean
//    TransactionHistoryService transactionHistoryService;
//    @MockBean
//    MemberCategoryService memberCategoryService;
//    @MockBean
//    TransactionHistoryMapper mapper;
//    @MockBean
//    TransactionHistoryRepository transactionHistoryRepository;
//    @MockBean
//    MemberCategoryMapper memberCategoryMapper;
//
//    @MockBean
//    MemberCategoryRepository memberCategoryRepository;
//    @Autowired
//    Gson gson;
//
//    @DisplayName("creation transaction_history")
//    @Test
//    void postTransactionHistoryTest() throws Exception {
//        String content = gson.toJson(post);
//        memberCategory1.setMember(member);
//        transactionHistory1.setMemberCategory(memberCategory1);
//        given(mapper.transactionHistoryPostDtoToTransactionHistory(post)).willReturn(new TransactionHistory());
//        given(transactionHistoryService.createTransactionHistory(Mockito.any(TransactionHistory.class), Mockito.anyLong())).willReturn(transactionHistory1);
//        ResultActions actions = mockMvc.perform(
//                post(BASE_URL + "/{member_category_id}", memberCategory1.getId())
//                        .with(csrf())
//                        .contentType(MediaType.APPLICATION_JSON)
//                        .accept(MediaType.APPLICATION_JSON)
//                        .content(content));
//
//        actions
//                .andExpect(status().isCreated())
//                .andDo(document("Post-TransactionHistory",
//                        preprocessRequest(prettyPrint()),
//                        preprocessResponse(prettyPrint()),
//                        requestFields(
//                                attributes(key("title")
//                                        .value("Fields for create Transaction History")),
//                                fieldWithPath("memberCategoryId")
//                                        .type(JsonFieldType.NUMBER)
//                                        .description("카테고리 식별자"),
//                                fieldWithPath("date")
//                                        .type(JsonFieldType.OBJECT)
//                                        .description("거래 일자"),
//                                fieldWithPath("date.year")
//                                        .type(JsonFieldType.NUMBER)
//                                        .description("거래 년도"),
//                                fieldWithPath("date.month")
//                                        .type(JsonFieldType.NUMBER)
//                                        .description("거래 월"),
//                                fieldWithPath("date.day")
//                                        .type(JsonFieldType.NUMBER)
//                                        .description("거래 일"),
//                                fieldWithPath("time")
//                                        .type(JsonFieldType.OBJECT)
//                                        .description("거래 시간(옵션)"),
//                                fieldWithPath("time.hour")
//                                        .type(JsonFieldType.NUMBER)
//                                        .description("거래 시간(옵션)"),
//                                fieldWithPath("time.minute")
//                                        .type(JsonFieldType.NUMBER)
//                                        .description("거래 시간(옵션)"),
//                                fieldWithPath("time.second")
//                                        .type(JsonFieldType.NUMBER)
//                                        .description("거래 시간(옵션)"),
//                                fieldWithPath("time.nano")
//                                        .type(JsonFieldType.NUMBER)
//                                        .description("거래 시간(옵션)"),
//                                fieldWithPath("memberCategoryId")
//                                        .type(JsonFieldType.NUMBER)
//                                        .description("카테고리 식별자"),
//                                fieldWithPath("memo")
//                                        .type(JsonFieldType.STRING)
//                                        .description("사용자 메모"),
//                                fieldWithPath("amount")
//                                        .type(JsonFieldType.NUMBER)
//                                        .description("거래 금액"),
//                                fieldWithPath("branchName")
//                                        .type(JsonFieldType.STRING)
//                                        .description("거래처")),
//                        responseHeaders(
//                                headerWithName(HttpHeaders.LOCATION)
//                                        .description("Header Location, 리소스의 URL"))));
//
//    }
//
//    @DisplayName("update transaction_history")
//    @Test
//    void patchTransactionHistoryTest() throws Exception {
//        String content = gson.toJson(patch);
//        given(transactionHistoryService.updateTransactionHistory(Mockito.any(TransactionHistory.class), Mockito.anyLong())).willReturn(transactionHistory1);
//
//        ResultActions actions = mockMvc.perform(
//                patch(BASE_URL + "/{transaction_history_id}", 1L)
//                        .with(csrf())
//                        .contentType(MediaType.APPLICATION_JSON)
//                        .accept(MediaType.APPLICATION_JSON)
//                        .content(content));
//
//        actions
//                .andExpect(status().isOk())
//                .andDo(document("Patch-TransactionHistory",
//                        preprocessRequest(prettyPrint()),
//                        preprocessResponse(prettyPrint()),
//                        requestFields(
//                                attributes(key("title")
//                                        .value("Fields for transaction history update")),
//                                fieldWithPath("memberCategoryId")
//                                        .type(JsonFieldType.NUMBER)
//                                        .description("카테고리 식별자"),
//                                fieldWithPath("date")
//                                        .type(JsonFieldType.OBJECT)
//                                        .description("거래 일자"),
//                                fieldWithPath("date.year")
//                                        .type(JsonFieldType.NUMBER)
//                                        .description("거래 년도"),
//                                fieldWithPath("date.month")
//                                        .type(JsonFieldType.NUMBER)
//                                        .description("거래 월"),
//                                fieldWithPath("date.day")
//                                        .type(JsonFieldType.NUMBER)
//                                        .description("거래 일"),
//                                fieldWithPath("time")
//                                        .type(JsonFieldType.OBJECT)
//                                        .description("거래 시간(옵션)"),
//                                fieldWithPath("time.hour")
//                                        .type(JsonFieldType.NUMBER)
//                                        .description("거래 시간(옵션)"),
//                                fieldWithPath("time.minute")
//                                        .type(JsonFieldType.NUMBER)
//                                        .description("거래 시간(옵션)"),
//                                fieldWithPath("time.second")
//                                        .type(JsonFieldType.NUMBER)
//                                        .description("거래 시간(옵션)"),
//                                fieldWithPath("time.nano")
//                                        .type(JsonFieldType.NUMBER)
//                                        .description("거래 시간(옵션)"),
//                                fieldWithPath("inoutType")
//                                        .type(JsonFieldType.STRING)
//                                        .description("입/출금"),
//                                fieldWithPath("memberCategoryId")
//                                        .type(JsonFieldType.NUMBER)
//                                        .description("카테고리 식별자"),
//                                fieldWithPath("memo")
//                                        .type(JsonFieldType.STRING)
//                                        .description("사용자 메모"),
//                                fieldWithPath("amount")
//                                        .type(JsonFieldType.NUMBER)
//                                        .description("거래 금액"),
//                                fieldWithPath("branchName")
//                                        .type(JsonFieldType.STRING)
//                                        .description("거래처"))));
//    }
//}
