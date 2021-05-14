## 12.0.0

- Bump version lock (dlc) to 7.23

## 11.1.0

- Allow version 7.17 (non-dlc)

## 11.0.0

- Bump version lock to 7.22

## 10.0.0

- Bump version lock to 7.17
- Handle new sim data section in save file.

## 9.0.0

- Bump version lock to 7.16 for AP
- Allow option to bypass version check.

## 8.1.2

- Fix mistyped `SpaceDestination.id`.

## 8.1.1

- Update SimHashes
- Update SpacecraftManager types.
- Greatly loosened strictness of .NET identifier validation. This should improve compatibility with mods, especially non-english ones.

## 8.1.0

- Update traits for RP.

## 8.0.0

- Bump version lock to 7.15 for RP.

## 7.2.0

- Add Allergies and Archaeologist traits.

## 7.1.0

- Update for save version 7.12

## 7.0.3

- Add assignableProxy to MinionIdentity
- Add various data structure default value helpers.

## 7.0.2

- Fix parse validator throwing errors on generic fields.

## 7.0.1

- Add salt water geyser to geyser names list.

## 7.0.0

- Bump version lock to 7.11 for LU.

## 6.0.3

- Return json-safe values for int64/uint64

## 6.0.2

- Provide MinionSkillNames constant.

## 6.0.1

- Update MinionResume for QOL3.

## 6.0.0

- Fix parsing 7.8. Requires backwards-incompatible change; no longer able to parse 7.7 and below.

## 5.2.1

- Enable loading versions 7.6 to 7.8.

## 5.2.0

- Add typings for gameData.customGameSettings
- Add SpacecraftManagerBehavior

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
