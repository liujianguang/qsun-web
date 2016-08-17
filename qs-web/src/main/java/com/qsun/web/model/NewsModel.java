package com.qsun.web.model;

import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.Model;
import com.jfinal.plugin.activerecord.Page;
import com.jfinal.plugin.activerecord.Record;
import com.qsun.base.common.Pager;
import com.qsun.core.kit.SqlXmlKit;
import com.qsun.core.plugin.annotation.Table;

@SuppressWarnings("serial")
@Table(tableName = "news")
public class NewsModel extends Model<NewsModel> {
	private static final Logger LOGGER = LoggerFactory
			.getLogger(NewsModel.class);

	public static final NewsModel dao = new NewsModel();

	public NewsModel top() {
		String sql = "select news.* from news "
				+ "order by news.update_time desc limit 1";
		List<NewsModel> find = dao.find(sql);
		if (find != null) {
			return find.get(0);
		}
		return null;
	}
	

	public Page<NewsModel> page(Pager pager) {
		LinkedList<Object> param = new LinkedList<Object>();
//		Page<Record> paginate = Db.paginate(1, 20, "select *", "from news where state = ?",1);
//		List<Record> list = paginate.getList();
		Page<NewsModel> page = dao.paginate(pager.getPageNo(),
				pager.getPageSize(), " select  *  ",
				SqlXmlKit.getSql("News.pager", pager.getParamsMap(), param),
				param.toArray());
		return page;
	}
	
	public Page<NewsModel> page(Pager pager,String source) {
		LinkedList<Object> param = new LinkedList<Object>();
//		Page<Record> paginate = Db.paginate(1, 20, "select *", "from news where state = ?",1);
//		List<Record> list = paginate.getList();
		Map<String, Object> paramsMap = pager.getParamsMap();
		paramsMap.put("source", source);
		Page<NewsModel> page = dao.paginate(pager.getPageNo(),
				pager.getPageSize(), " select  *  ",
				SqlXmlKit.getSql("News.pager1", paramsMap, param),
				param.toArray());
		return page;
	}
}
