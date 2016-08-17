package com.qsun.web.model;

import java.util.LinkedList;

import com.jfinal.plugin.activerecord.Model;
import com.jfinal.plugin.activerecord.Page;
import com.qsun.base.common.Pager;
import com.qsun.core.kit.SqlXmlKit;
import com.qsun.core.plugin.annotation.Table;

@Table(tableName = "message")
public class MessageModel extends Model<MessageModel> {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1857894165L;
	
	public static final MessageModel dao = new MessageModel();

	public Page<MessageModel> page(Pager pager) {
		LinkedList<Object> param = new LinkedList<Object>();
		Page<MessageModel> page = dao.paginate(pager.getPageNo(),
				pager.getPageSize(), " select  *  ",
				SqlXmlKit.getSql("Message.pager", pager.getParamsMap(), param),
				param.toArray());
		return page;
	}
}
