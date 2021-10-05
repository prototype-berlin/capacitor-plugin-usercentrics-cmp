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
* [`update(...)`](#update)
* [`reset(...)`](#reset)
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


### update(...)

```typescript
update(options: { settingsId: string; }) => Promise<UsercentricsConsents>
```

| Param         | Type                                 |
| ------------- | ------------------------------------ |
| **`options`** | <code>{ settingsId: string; }</code> |

**Returns:** <code>Promise&lt;<a href="#usercentricsconsents">UsercentricsConsents</a>&gt;</code>

--------------------


### reset(...)

```typescript
reset(options: { settingsId: string; }) => Promise<UsercentricsConsents>
```

| Param         | Type                                 |
| ------------- | ------------------------------------ |
| **`options`** | <code>{ settingsId: string; }</code> |

**Returns:** <code>Promise&lt;<a href="#usercentricsconsents">UsercentricsConsents</a>&gt;</code>

--------------------


### Interfaces


#### UsercentricsConsents

| Prop                  | Type                              |
| --------------------- | --------------------------------- |
| **`acceptedVendors`** | <code>UsercentricsVendor[]</code> |


#### UsercentricsVendor

| Prop             | Type                                  |
| ---------------- | ------------------------------------- |
| **`categoryId`** | <code>string</code>                   |
| **`subVendors`** | <code>UsercentricsBaseVendor[]</code> |


#### UsercentricsBaseVendor

| Prop        | Type                |
| ----------- | ------------------- |
| **`id`**    | <code>string</code> |
| **`label`** | <code>string</code> |

</docgen-api>
