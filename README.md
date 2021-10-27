# capacitor-plugin-usercentrics-cmp

A Plugin for the Usercentrics Consent Management Platform (CMP) which enables you to harmonize your marketing and data strategy with legal requirements.

## Install

```bash
npm install capacitor-plugin-usercentrics-cmp
npx cap sync
```

## API

<docgen-index>

* [`init(...)`](#init)
* [`update()`](#update)
* [`reset()`](#reset)
* [Interfaces](#interfaces)

</docgen-index>

<docgen-api>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

### init(...)

```typescript
init(options: { settingsId: string; }) => Promise<UsercentricsConsents>
```

| Param         | Type                                 |
| ------------- | ------------------------------------ |
| **`options`** | <code>{ settingsId: string; }</code> |

**Returns:** <code>Promise&lt;<a href="#usercentricsconsents">UsercentricsConsents</a>&gt;</code>

--------------------


### update()

```typescript
update() => Promise<UsercentricsConsents>
```

**Returns:** <code>Promise&lt;<a href="#usercentricsconsents">UsercentricsConsents</a>&gt;</code>

--------------------


### reset()

```typescript
reset() => Promise<UsercentricsConsents>
```

**Returns:** <code>Promise&lt;<a href="#usercentricsconsents">UsercentricsConsents</a>&gt;</code>

--------------------


### Interfaces


#### UsercentricsConsents

| Prop          | Type                              |
| ------------- | --------------------------------- |
| **`vendors`** | <code>UsercentricsVendor[]</code> |


#### UsercentricsVendor

| Prop          | Type                 |
| ------------- | -------------------- |
| **`status`**  | <code>boolean</code> |
| **`id`**      | <code>string</code>  |
| **`type`**    | <code>any</code>     |
| **`version`** | <code>string</code>  |
| **`label`**   | <code>string</code>  |

</docgen-api>
