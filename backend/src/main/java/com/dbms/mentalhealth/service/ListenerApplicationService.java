package com.dbms.mentalhealth.service;
import com.dbms.mentalhealth.dto.listenerApplication.request.ListenerApplicationRequestDTO;
import com.dbms.mentalhealth.dto.listenerApplication.response.ListenerApplicationResponseDTO;
import com.dbms.mentalhealth.dto.listenerApplication.response.ListenerApplicationResponseDTO;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ListenerApplicationService {
    ListenerApplicationResponseDTO submitApplication(ListenerApplicationRequestDTO applicationRequestDTO, MultipartFile certificate) throws Exception;
    ListenerApplicationResponseDTO getApplicationById(Integer applicationId);
    void deleteApplication(Integer applicationId);
    List<ListenerApplicationResponseDTO> getAllApplications();
    ListenerApplicationResponseDTO updateApplication(Integer applicationId, ListenerApplicationRequestDTO applicationRequestDTO, MultipartFile certificate) throws Exception;
}