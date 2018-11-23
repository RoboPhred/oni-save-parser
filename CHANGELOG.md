## 5.1.5

- Sync sim hashes with game for space update.

## 5.1.4

- Add missing Foodie and SimpleTastes traits. Remove non-traits Caring and MedicalAid from traits list.

## 5.1.3

- Fix crash in accessory utilities when encountering game-generated null guid.

## 5.1.2

- Bump save file version to match rocketry update. No parser changes

## 5.1.1

- Update header version check to match official release of Expressive Update.

## 5.1.0

- Compatibility with Expressive Update.

## 5.0.0

- Make ACCESSORY consts be CamelCase consistent with other consts.
- Rename MinionRole to MinionRoleGroup to reflect its actual contents.
- Fix incorrect HashedString hashes due to case sensitivity.

## 4.2.3

- Fix crash on save from MinionModifierBehavior.

## 4.2.2

- Fix MinionModifierBehavior types. Again.

## 4.2.1

- Fix MinionModifierBehavior types.

## 4.2.0

- Fix MinionModifiers not exported.
- Add ACCESSORIES_BY_TYPE.

## 4.1.0

- Basic progress reporting (game object start only).
- Restore MinionModifiers.

## 4.0.0

- Rework accessory type code to handle non-ordinal and prefix-clashing accessory names.
  -- prefix clash: "hair" vs "hair_always"
  -- non-ordinal: "hair_always_DEFAULT"

## 3.2.1

- Fix AccessoryType.

## 3.2.0

- Add missing accessory slots.
- Added map tying minion identity bodyData slots to accessories.

## 3.1.1

- Fix PrimaryElementBehavior interface name.

## 3.1.0

- Add missing templateData typings to StorageBehavior.

## 3.0.1

- Export StorageBehavior.

## 3.0.0

- Include hard-coded enumeration and other constant data.
  -- SimHashes
  -- GeyserType
  -- HealthState

## 2.2.1

- Fix getBehavior not exported.

## 2.2.0

- Added support for parsing extra data of Storage behavior.
  Enables modifying the stored contents of all game objects that store items. This includes storage compactors, hydrogen and coal generators, and various other internal buffers used by buildings and creatures.
- Export TypeTemplate and related typings
- Export known GameObject types
