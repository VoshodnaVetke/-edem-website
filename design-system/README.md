# Дизайн-система «Эдем»

**Актуальная версия: v55.** Для дальнейшей разработки использовать [HTML v55](v55/edem-interface-cyberpunk-v55-onest.html) и [полную спецификацию v55](../docs/DESIGN_SYSTEM_V55.md).

История: v50 зафиксировала графическую систему и все варианты загрузок; v51–v52 исправили поведение при касании и скорость появления при прокрутке; v53–v54 проверяли вес Anonymous Pro; v55 использует Onest для читаемых текстов.

Роли шрифтов: Tektur (заголовки), Onest 450 (обычный текст), Anonymous Pro (телеметрия).

**Внимание:** HTML — демонстрация компонентов, не готовая главная страница. Для точных шрифтов и части анимаций требуется интернет. Не публиковать закрытые материалы и не придумывать факты о мире.

[Историческая версия v50](v50/edem-interface-cyberpunk-v50-rough-states.html) сохранена отдельно.

## Утверждённые дополнения к v55
- [Typography v1.0 «Баланс B»](../docs/TYPOGRAPHY_V1_APPROVED.md) ([CSS](tokens/typography.css), [лаборатория](prototypes/typography/typography-comparison-v1.html)) — **APPROVED**.
- [Layout Grid v1.0](../docs/LAYOUT_GRID_V1_APPROVED.md) ([CSS](tokens/layout.css), [пример](prototypes/layout/layout-grid-v1-example.html)) — **APPROVED** для 4/8/12 + auto-fit + Container Queries; числовые пределы карточек ещё черновые.
- [Navigation C v1.2](../docs/NAVIGATION_C_V1_2_PRELIMINARY.md) ([прототип](prototypes/navigation/navigation-c-v1-2.html)) — **PRELIMINARY**, не окончательно утверждена.

Новые токены и прототипы размещены отдельно и не изменяют исторический HTML v55.

## Цвета
- [Color Tokens v1.0](../docs/COLOR_TOKENS_V1.md) — палитра v55, назначение и контраст.
- [CSS](tokens/colors.css) · [адаптивный визуальный образец](prototypes/colors/color-tokens-v1.html).
- Цвета не изменены; новые семантические имена дополняют утверждённые значения.

## Кнопки
- [Buttons v1.1](../docs/BUTTONS_V1_1_APPROVED.md) — утверждённые обычное, выбранное и hover-состояния.
- [Component Atlas v9](prototypes/components/atlas-v9-filter-selected-cyan.html): живой HTML. Выбранный фильтр циановый с белым контуром; наведение — фиолетовый с циановым.

## Подготовка React-библиотеки

[Очищенный Component Atlas v10.4](prototypes/components/atlas-clean/README.md) — исходники с модульными CSS/JS и без `!important` в активных стилях. Это этап очистки перед React; библиотека React ещё не опубликована. [Проверки](../tests/design-system/README.md).
