# Universal Editor Sample App - Franklin Plugin

## connection

```
    <meta name="urn:auecon:fnkconnection" content="fnk:https://main--wknd-spa-sheets--tripodsan.hlx.page">
```

## addressing

the `itemId` for franklin sheets follows the following pattern:

```
urn:fnkconnection:{path}:{sheet}:{keycol}:{key}
```

| segment  | purpose                              | example            |
|----------|--------------------------------------|--------------------|
| `path`   | path (with extesion) to the resource | `/adventures.json` |
| `sheet`  | name of the sheet.                   | `default`          |
| `keycol` | name of the key column or # for idx  | `name`, `0`        |
| `key`    | row key                              | `bali-surf-camp`   |

### Examples

**selecting and using an item scope in a sheet with rows**

```html
<div itemtype="urn:fnk:type/sheet" itemid="/adventures.json:default:name:diving-in-bali" itemscope>
    <span itemprop="title" itemtype="text">Welcome</span>
</div>
```


**selecting an item in a sheet with key/value pairs**

```html
<span itemid="/constants.json:default:key:footerTitle" itemprop="value" itemtype="text">Welcome</span>
```
