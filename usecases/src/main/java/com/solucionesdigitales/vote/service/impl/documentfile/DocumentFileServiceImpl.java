package com.solucionesdigitales.vote.service.impl.documentfile;

import java.util.Calendar;
import java.util.Date;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.solucionesdigitales.vote.entity.documentfile.DocumentFile;
import com.solucionesdigitales.vote.repository.documentfile.DocumentFileRepository;
import com.solucionesdigitales.vote.service.module.documentfile.DocumentFileService;

@Service("documentFileService")
public class DocumentFileServiceImpl implements DocumentFileService{
	
	private static final Logger logger = LoggerFactory.getLogger(DocumentFileServiceImpl.class);
	
	@Autowired
	private DocumentFileRepository repository;
	
	@Override
	public List<DocumentFile> fetch(int status, String moduloId, int moduloodStatus) {
		List<DocumentFile> records = repository.findByStatusAndModuloodIdAndModuloodStatusOrderByFechaDesc(status, moduloId,moduloodStatus);
		return records;
	}
	
	@Override
	public List<DocumentFile> fetchByBetweenDates(int status, String moduloodId, int moduloodStatus, Date dateStart, Date dateEnd) {
		Calendar date = Calendar.getInstance();
		date.setTime(dateEnd);
		date.add(Calendar.DAY_OF_YEAR, 1);
		
		return repository.findByStatusAndModuloodIdAndModuloodStatusAndFechaBetweenOrderByFechaDesc(status,moduloodId,moduloodStatus,dateStart,date.getTime());
	}

	@Override
	public DocumentFile post(DocumentFile entity) {
		DocumentFile archive = new DocumentFile();
		if(entity.getFecha() != null & entity.getNombre() != null) {
			archive = repository.save(entity);
			logger.info("Archivo registrado: ["+entity.toString()+"]");
		}
		return archive;
	}

	@Override
	public DocumentFile put(DocumentFile entity) {
		DocumentFile archive = new DocumentFile();
		if(entity.getFecha() != null & entity.getNombre() != null) {
			archive = repository.save(entity);
			logger.info("Archivo registrado: ["+entity.toString()+"]");
		}
		return archive;
	}

	@Override
	public DocumentFile delete(DocumentFile entity) {
		DocumentFile archive = new DocumentFile();
		entity.setStatus(0);
		entity.setDeleteDate(new Date());
		if(entity.getFecha() != null & entity.getNombre() != null) {
			repository.save(entity);
			archive = entity;
			logger.info("Archivo eliminado: ["+entity.toString()+"]");
		}
		return archive;
	}
}
