---
title: Keyboard shortcuts
description: The keyboard shortcuts the Keleustes window responds to, by screen.
order: 4
sources: [keleustes/crates/kls-ui/src/screens/sessions.rs, keleustes/crates/kls-ui/src/screens/board.rs, keleustes/crates/kls-ui/src/screens/board/tabs.rs, keleustes/crates/kls-ui/src/screens/conflicts.rs, keleustes/crates/kls-ui/src/screens/workflows.rs, keleustes/crates/kls-ui/src/lib.rs]
checked: [keleustes@e13fb9b]
updated: 23 Nov 2026
status: available
---

Keleustes has a small set of shortcuts, each tied to one screen. There are no global shortcuts: nothing switches screens, opens a search or toggles the theme from the keyboard, and shortcuts cannot be rebound.

The single-letter keys work only while no text field has focus.

## Sessions

| Keys | Action |
|---|---|
| <kbd>Ctrl</kbd>+<kbd>Enter</kbd> (<kbd>Cmd</kbd>+<kbd>Enter</kbd> on macOS) | Send the prompt, while the composer has focus |

## Board

| Keys | Where | Action |
|---|---|---|
| <kbd>Ctrl</kbd>+click (<kbd>Cmd</kbd>+click on macOS) | A card | Add the card to the selection, or remove it, without opening it |
| <kbd>J</kbd> | Review tab | Next row |
| <kbd>K</kbd> | Review tab | Previous row |
| <kbd>C</kbd> | Review tab | Confirm the card. It moves to the backlog. |
| <kbd>X</kbd> | Review tab | Dismiss the card |

The Review keys are ignored while a modifier key is held.

## Conflicts

| Keys | Action |
|---|---|
| <kbd>J</kbd> | Next file in the conflict |
| <kbd>K</kbd> | Previous file |

Both wrap around at the ends of the file list.

## Workflows

These apply to the graph editor.

| Input | Action |
|---|---|
| <kbd>Delete</kbd> or <kbd>Backspace</kbd> | Remove the selected node or edge |
| Drag from a port | Connect two nodes |
| Drag the canvas, or scroll | Pan |

## Related

- [Sessions](/keleustes/using/sessions/)
- [Board and checkpoints](/keleustes/using/board-and-checkpoints/)
- [Conflicts and delivery](/keleustes/using/conflicts-and-delivery/)
- [Workflows and templates](/keleustes/using/workflows-and-templates/)
