package com.hf.homeflow.repository;

import lombok.RequiredArgsConstructor;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.hf.homeflow.dto.MenuItemDto;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class MenuRepository {

    private final JdbcTemplate jdbcTemplate;

    public List<MenuItemDto> findMenusByRol(Short idRol) {

        String sql = """
            SELECT
                m.id_menu,
                m.opcion,
                m.orden,
                m.ruta,
                m.icono
            FROM tbl_rol_menu rm
            INNER JOIN cat_menu m
                ON rm.id_menu = m.id_menu
            WHERE rm.id_rol = ?
              AND rm.estatus = TRUE
              AND m.estatus = TRUE
              AND m.es_visible = TRUE
            ORDER BY m.orden ASC
            """;

        return jdbcTemplate.query(
                sql,
                (rs, rowNum) -> new MenuItemDto(
                        rs.getShort("id_menu"),
                        rs.getString("opcion"),
                        rs.getShort("orden"),
                        rs.getString("ruta"),
                        rs.getString("icono")
                ),
                idRol
        );
    }
}