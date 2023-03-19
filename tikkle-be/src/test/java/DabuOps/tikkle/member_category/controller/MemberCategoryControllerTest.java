package DabuOps.tikkle.member_category.controller;

import DabuOps.tikkle.category.entity.Category;
import DabuOps.tikkle.member.entity.Member;
import DabuOps.tikkle.member_category.dto.MemberCategoryDto;
import DabuOps.tikkle.member_category.entity.MemberCategory;
import DabuOps.tikkle.member_category.mapper.MemberCategoryMapper;
import DabuOps.tikkle.member_category.repository.MemberCategoryRepository;
import DabuOps.tikkle.member_category.service.MemberCategoryService;
import com.google.gson.Gson;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.jpa.mapping.JpaMetamodelMappingContext;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

import java.util.List;

import static org.mockito.Mockito.doNothing;
import static org.springframework.restdocs.headers.HeaderDocumentation.headerWithName;
import static org.springframework.restdocs.headers.HeaderDocumentation.responseHeaders;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.*;
import static org.springframework.restdocs.payload.PayloadDocumentation.*;
import static org.springframework.restdocs.request.RequestDocumentation.*;
import static org.springframework.restdocs.snippet.Attributes.attributes;
import static org.springframework.restdocs.snippet.Attributes.key;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import static org.mockito.BDDMockito.given;

@WebMvcTest(MemberCategoryController.class)
@AutoConfigureRestDocs
@MockBean(JpaMetamodelMappingContext.class)
@WithMockUser(username = "kimconding@gmail.com", roles = {"USER"})
public class MemberCategoryControllerTest {
    String BASE_URL = "/categories";

    Member member = Member.builder()
            .id(1L)
            .email("test@gmail.com")
            .name("홍길동")
            .state(Member.MemberState.ACTIVE)
            .payDay(25)
            .initDate(15)
            .gender(Member.Gender.male)
            .location("seoul")
            .build();

    Category category = Category.builder()
            .id(1L)
            .name("밥")
            .build();
    MemberCategory memberCategory1 = MemberCategory.builder()
            .id(1L)
            .member(member)
            .category(category)
            .name("배달")
            .status(MemberCategory.Status.ACTIVE)
            .build();

    MemberCategory memberCategory2 = MemberCategory.builder()
            .id(2L)
            .member(member)
            .category(category)
            .name("편의점")
            .status(MemberCategory.Status.ACTIVE)
            .build();

    MemberCategoryDto.Post post = MemberCategoryDto.Post.builder()
            .name("맥주")
            .build();

    MemberCategoryDto.Patch patch = MemberCategoryDto.Patch.builder()
            .name("양주")
            .build();

    MemberCategoryDto.Response response1 = MemberCategoryDto.Response.builder()
            .id(memberCategory1.getId())
            .name(memberCategory1.getName())
            .memberId(memberCategory1.getMember().getId())
            .categoryId(memberCategory1.getCategory().getId())
            .createdAt(memberCategory1.getCreatedAt())
            .build();

    MemberCategoryDto.Response response2 = MemberCategoryDto.Response.builder()
            .id(memberCategory2.getId())
            .name(memberCategory2.getName())
            .memberId(memberCategory2.getMember().getId())
            .categoryId(memberCategory2.getCategory().getId())
            .createdAt(memberCategory2.getCreatedAt())
            .build();

    @Autowired
    MockMvc mockMvc;

    @MockBean
    MemberCategoryService memberCategoryService;

    @MockBean
    MemberCategoryMapper mapper;

    @MockBean
    MemberCategoryRepository memberCategoryRepository;

    @Autowired
    Gson gson;

    @DisplayName("creation member_category")
    @Test
    void postCategoryTest() throws Exception {
        String content = gson.toJson(post);
        memberCategory1.setMember(member);
        given(mapper.memberCategoryPostDtoToMemberCategory(post)).willReturn(new MemberCategory());
        given(memberCategoryService.createMemberCategory(Mockito.any(MemberCategory.class), Mockito.anyLong())).willReturn(memberCategory1);

        ResultActions actions = mockMvc.perform(
                post(BASE_URL + "/{member-id}", 1L)
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON)
                        .content(content));

        actions
                .andExpect(status().isCreated())
                .andDo(document("Post-Category",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        requestFields(
                                attributes(key("title")
                                        .value("Fields for category creation")),
                                fieldWithPath("name")
                                        .type(JsonFieldType.STRING)
                                        .description("카테고리 이름")),
                        responseHeaders(
                                headerWithName(HttpHeaders.LOCATION)
                                        .description("Header Location, 리소스의 URL"))));

    }

    @DisplayName("update member_category")
    @Test
    void patchCategoryTest() throws Exception {
        String content = gson.toJson(patch);
        given(memberCategoryService.updateMemberCategory(Mockito.any(MemberCategory.class), Mockito.anyLong())).willReturn(memberCategory1);

        ResultActions actions = mockMvc.perform(
                patch(BASE_URL + "/{member_category_id}", 1L)
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON)
                        .content(content));

        actions
                .andExpect(status().isOk())
                .andDo(document("Patch-Category",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        requestFields(
                                attributes(key("title")
                                        .value("Fields for category update")),
                                fieldWithPath("name")
                                        .type(JsonFieldType.STRING)
                                        .description("수정한 카테고리 이름"))));
    }

    @DisplayName("find one member_category")
    @Test
    void getCategoryTest() throws Exception {
        given(memberCategoryService.findMemberCategory(Mockito.anyLong())).willReturn(memberCategory1);
        given(mapper.memberCategoryToMemberCategoryResponseDto(Mockito.any(MemberCategory.class))).willReturn(response1);

        ResultActions actions = mockMvc.perform(
                get(BASE_URL + "/members/{member_category_id}", memberCategory1.getId())
                        .with(csrf())
                        .accept(MediaType.APPLICATION_JSON));

        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data").exists())
                .andExpect(jsonPath("$.data.id").exists())
                .andExpect(jsonPath("$.data.memberId").exists())
                .andExpect(jsonPath("$.data.categoryId").exists())
                .andExpect(jsonPath("$.data.name").exists())
                .andDo(document("Get-Category",
                        preprocessResponse(prettyPrint()),
                        responseFields(
                                fieldWithPath("data")
                                        .type(JsonFieldType.OBJECT)
                                        .description("조회 데이터"),
                                fieldWithPath("data.id")
                                        .type(JsonFieldType.NUMBER)
                                        .description("카테고리 식별자"),
                                fieldWithPath("data.memberId")
                                        .type(JsonFieldType.NUMBER)
                                        .description("회원 식별자"),
                                fieldWithPath("data.categoryId")
                                        .type(JsonFieldType.NUMBER)
                                        .description("원본 카테고리 식별자"),
                                fieldWithPath("data.name")
                                        .type(JsonFieldType.STRING)
                                        .description("카테고리 이름"),
                                fieldWithPath("data.createdAt")
                                        .type(JsonFieldType.NULL)
                                        .description("카테고리 생성 시간"))))
        .andReturn().getResponse().getContentAsString();
    }

    @DisplayName("find member_category list")
    @Test
    void getCategoriesTest() throws Exception {
        List<MemberCategory> memberCategoryList = List.of(memberCategory1, memberCategory2);
        List<MemberCategoryDto.Response> responses = List.of(response1, response2);

        given(memberCategoryService.findAllMemberCategories(Mockito.anyLong()))
                .willReturn(memberCategoryList);
        given(mapper.memberCategoriesToMemberCategoryResponseDto(memberCategoryList))
                .willReturn(responses);

        ResultActions actions = mockMvc.perform(
                get(BASE_URL + "/{member_id}", member.getId())
                        .accept(MediaType.APPLICATION_JSON));

        actions
                .andExpect(jsonPath("$.data[0]").exists())
                .andExpect(jsonPath("$.data[0].id").exists())
                .andExpect(jsonPath("$.data[0].memberId").exists())
                .andExpect(jsonPath("$.data[0].categoryId").exists())
                .andExpect(jsonPath("$.data[0].name").exists())
                .andDo(document(
                        "Get-Categories",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        responseFields(
                                fieldWithPath("data").type(JsonFieldType.ARRAY)
                                        .description("조회 결과 리스트"),
                                fieldWithPath("data[].id")
                                        .type(JsonFieldType.NUMBER)
                                        .description("카테고리 식별자"),
                                fieldWithPath("data[].memberId")
                                        .type(JsonFieldType.NUMBER)
                                        .description("회원 식별자"),
                                fieldWithPath("data[].categoryId")
                                        .type(JsonFieldType.NUMBER)
                                        .description("원본 카테고리 식별자"),
                                fieldWithPath("data[].name")
                                        .type(JsonFieldType.STRING)
                                        .description("카테고리 이름"),
                                fieldWithPath("data[].createdAt")
                                        .type(JsonFieldType.NULL)
                                        .description("카테고리 생성 시간"))))
                .andReturn().getResponse().getContentAsString();

    }

    @DisplayName("delete member_category")
    @Test
    void deleteCategoryTest() throws Exception {
        doNothing().when(memberCategoryService).deleteMemberCategory(memberCategory1.getId());

        ResultActions actions = mockMvc.perform(
                delete(BASE_URL + "/{member_category_id}", memberCategory1.getId())
                        .with(csrf())
                        .accept(MediaType.APPLICATION_JSON));

        actions
                .andExpect(status().isNoContent())
                .andExpect(jsonPath("$.data").doesNotExist())
                .andDo(document("Delete-Category",
                        preprocessResponse(prettyPrint())));
    }
}
