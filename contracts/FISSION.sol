pragma solidity ^0.5.0;

import { LocalizationPreferences} from "/ethereum-localized-messaging/contracts/LocalizationPreferences.sol";
import { FissionLocalization } from "./localization/FissionLocalization.sol";

/**
 * @title The FISSION Status Code Library
 *
 * @dev Implementation of broadly applicable status codes for smart contracts.
 *      https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1066.md
 */
library FISSION {

    ///////////////////////////// Decomposed Enums /////////////////////////////

    /// @dev The category component of an ERC-1066 status code (ie: the columns)
    enum Category {
        Generic,
        Permission,
        Find,
        Negotiation,
        Availability,
        Finance,

        x60,
        x70,
        x80,
        x90,

        ApplicationSpecific,

        xB0,
        xC0,
        xD0,

        Cryptography,
        OffChain
    }

    /// @dev The reason component of an ERC-1066 status code (ie: the rows)
    enum Reason {
        Failure,
        Success,

        AwaitingOthers,
        Accepted,
        LowerLimit,
        ActionRequested,
        UpperLimit,

        x06,
        x07,

        Inapplicable,

        x09,
        x0A,
        x0B,
        x0C,
        x0D,
        x0E,

        Informational
    }

    //////////////////////////// Simple Status Enum ////////////////////////////

    /// @dev ERC-1066 status codes encoded as human-readable enums
    enum Status {

        // 0x0*
        Failure,
        Success,
        AwatingOthers,
        Accepted,
        LowerLimit,
        RecieverActionRequested,
        UpperLimit,
        RESERVEDx07,
        Inapplicable,
        RESERVEDx09,
        RESERVEDx0A,
        RESERVEDx0B,
        RESERVEDx0C,
        RESERVEDx0D,
        RESERVEDx0E,
        Informational,

        // 0x1*
        Disallowed_Stop,
        Allowed_Go,
        AwaitingOthersPermission,
        PermissionRequested,
        TooOpen_Insecure,
        NeedsYourPermission_RequestForContinuation,
        Revoked,
        RESERVEDx17,
        NotApplicatableToCurrentState,
        RESERVEDx19,
        RESERVEDx1A,
        RESERVEDx1B,
        RESERVEDx1C,
        RESERVEDx1D,
        RESERVEDx1E,
        PermissionDetails_ControlConditions,

        // 0x2*
        NotFound_Unequal_OutOfRange,
        Found_Equal_InRange,
        AwaitingMatch,
        MatchRequestSent,
        BelowRange_Underflow,
        RequestForMatch,
        Above_Range_Overflow,
        RESERVEDx27,
        Duplicate_Conflict_Collision,
        RESERVEDx29,
        RESERVEDx2A,
        RESERVEDx2B,
        RESERVEDx2C,
        RESERVEDx2D,
        RESERVEDx2E,
        MatchingInformation,

        // 0x3*
        SenderDisagrees_Nay,
        SenderAgrees_Yea,
        AwaitingRatification,
        OfferSent_Voted,
        QuorumNotReached,
        ReceiversRatificationRequested,
        OfferOrVoteLimitReached,
        RESERVEDx37,
        AlreadyVoted,
        RESERVEDx39,
        RESERVEDx3A,
        RESERVEDx3B,
        RESERVEDx3C,
        RESERVEDx3D,
        RESERVEDx3E,
        NegotiationRules_ParticipationInformation,

        // 0x4*
        Unavailable,
        Available,
        Paused,
        Queued,
        NotAvailableYet,
        AwaitingYourAvailability,
        Expired,
        RESERVEDx47,
        AlreadyDone,
        RESERVEDx49,
        RESERVEDx4A,
        RESERVEDx4B,
        RESERVEDx4C,
        RESERVEDx4D,
        RESERVEDx4E,
        AvailabilityRules_Information,

        // 0x5*
        TransferFailed,
        TransferSuccessful,
        AwaitingPaymentFromOthers,
        Hold_Escrow,
        InsufficientFunds,
        FundsRequested,
        TransferVolumeExceeded,
        RESERVEDx57,
        FundsNotRequired,
        RESERVEDx59,
        RESERVEDx5A,
        RESERVEDx5B,
        RESERVEDx5C,
        RESERVEDx5D,
        RESERVEDx5E,
        FinancialInformation,

        // 0x6*
        RESERVEDx60,
        RESERVEDx61,
        RESERVEDx62,
        RESERVEDx63,
        RESERVEDx64,
        RESERVEDx65,
        RESERVEDx66,
        RESERVEDx67,
        RESERVEDx68,
        RESERVEDx69,
        RESERVEDx6A,
        RESERVEDx6B,
        RESERVEDx6C,
        RESERVEDx6D,
        RESERVEDx6E,
        RESERVEDx6F,

        // 0x7*
        RESERVEDx70,
        RESERVEDx71,
        RESERVEDx72,
        RESERVEDx73,
        RESERVEDx74,
        RESERVEDx75,
        RESERVEDx76,
        RESERVEDx77,
        RESERVEDx78,
        RESERVEDx79,
        RESERVEDx7A,
        RESERVEDx7B,
        RESERVEDx7C,
        RESERVEDx7D,
        RESERVEDx7E,
        RESERVEDx7F,

        // 0x8*
        RESERVEDx80,
        RESERVEDx81,
        RESERVEDx82,
        RESERVEDx83,
        RESERVEDx84,
        RESERVEDx85,
        RESERVEDx86,
        RESERVEDx87,
        RESERVEDx88,
        RESERVEDx89,
        RESERVEDx8A,
        RESERVEDx8B,
        RESERVEDx8C,
        RESERVEDx8D,
        RESERVEDx8E,
        RESERVEDx8F,

        // 0x9*
        RESERVEDx90,
        RESERVEDx91,
        RESERVEDx92,
        RESERVEDx93,
        RESERVEDx94,
        RESERVEDx95,
        RESERVEDx96,
        RESERVEDx97,
        RESERVEDx98,
        RESERVEDx99,
        RESERVEDx9A,
        RESERVEDx9B,
        RESERVEDx9C,
        RESERVEDx9D,
        RESERVEDx9E,
        RESERVEDx9F,

        // 0xA*
        ApplicationSpecificFailure,
        ApplicationSpecificSuccess,
        ApplicationSpecificAwatingOthers,
        ApplicationSpecificAccepted,
        ApplicationSpecificLowerLimit,
        ApplicationSpecificRecieverActionRequested,
        ApplicationSpecificUpperLimit,
        RESERVEDxA7,
        ApplicationSpecific_Inapplicable,
        RESERVEDxA9,
        RESERVEDxAA,
        RESERVEDxAB,
        RESERVEDxAC,
        RESERVEDxAD,
        RESERVEDxAE,
        ApplicationSpecificInformational,

        // 0xB*
        RESERVEDxB0,
        RESERVEDxB1,
        RESERVEDxB2,
        RESERVEDxB3,
        RESERVEDxB4,
        RESERVEDxB5,
        RESERVEDxB6,
        RESERVEDxB7,
        RESERVEDxB8,
        RESERVEDxB9,
        RESERVEDxBA,
        RESERVEDxBB,
        RESERVEDxBC,
        RESERVEDxBD,
        RESERVEDxBE,
        RESERVEDxBF,

        // 0xC*
        RESERVEDxC0,
        RESERVEDxC1,
        RESERVEDxC2,
        RESERVEDxC3,
        RESERVEDxC4,
        RESERVEDxC5,
        RESERVEDxC6,
        RESERVEDxC7,
        RESERVEDxC8,
        RESERVEDxC9,
        RESERVEDxCA,
        RESERVEDxCB,
        RESERVEDxCC,
        RESERVEDxCD,
        RESERVEDxCE,
        RESERVEDxCF,

        // 0xD*
        RESERVEDxD0,
        RESERVEDxD1,
        RESERVEDxD2,
        RESERVEDxD3,
        RESERVEDxD4,
        RESERVEDxD5,
        RESERVEDxD6,
        RESERVEDxD7,
        RESERVEDxD8,
        RESERVEDxD9,
        RESERVEDxDA,
        RESERVEDxDB,
        RESERVEDxDC,
        RESERVEDxDD,
        RESERVEDxDE,
        RESERVEDxDF,

        // 0xE*
        DecryptFailure,
        DecryptSuccess,
        AwaitingOtherSignaturesOrKeys,
        Signed,
        Unsigned_Untrusted,
        SignatureRequired,
        KnownToBeCompromised,
        RESERVEDxE7,
        AlreadySigned_NotEncrypted,
        RESERVEDxE9,
        RESERVEDxEA,
        RESERVEDxEB,
        RESERVEDxEC,
        RESERVEDxED,
        RESERVEDxEE,
        Cryptography_ID_ProofMetadata,

        // 0xF*
        OffChainFailure,
        OffChainSuccess,
        AwatingOffChainProcess,
        OffChainProcessStarted,
        OffChainServiceUnreachable,
        OffChainActionRequired,
        OffChainExpiry_LimitReached,
        RESERVEDxF7,
        DuplicateOffChainRequest,
        RESERVEDxF9,
        RESERVEDxFA,
        RESERVEDxFB,
        RESERVEDxFC,
        RESERVEDxFD,
        RESERVEDxFE,
        OffChainInformation
    }

    ////////////////////////////// Construction ////////////////////////////////

    /**
     * @dev Coerce a status enum into a standard status byte
     *
     * @param statusEnum Status enum tag
     * @return status Binary ERC-1066 status code
     */
    function code(Status statusEnum) public pure returns (byte status) {
        return byte(uint8(statusEnum));
    }

    /**
     * @dev Construct a status code from a category and reason.
     *
     * @param category Category nibble
     * @param reason Reason nibble
     * @return status Binary ERC-1066 status code
     */
    function code(byte category, byte reason)
        public
        pure
        returns (byte status)
    {
        return (category << 4) | (byte(0x0F) & reason);
    }

    /**
     * @dev Construct a status code from a category and reason.
     *
     * @param category The category
     * @param reason The reason
     * @return status Binary ERC-1066 status code
     */
    function code(uint8 category, uint8 reason)
        public
        pure
        returns (byte status)
    {
        return byte(uint8((category << 4) + reason));
    }

    /**
     * @dev Construct a status code from category and reason enums
     *
     * @param category Category nibble
     * @param reason Reason nibble
     * @return status Binary ERC-1066 status code
     */
    function code(Category category, Reason reason)
        public
        pure
        returns (byte status)
    {
        return code(uint8(category), uint8(reason));
    }

    /**
     * @dev Construct an application-specific status code
     *
     * @param appReason Application-specific reason nibble
     * @return status Binary ERC-1066 status code
     */
    function appCode(byte appReason) public pure returns (byte status) {
        return (byte(0xA0) | appReason);
    }

    /**
     * @dev Construct an application-specific status code
     *
     * @param Application-specific reason
     * @return Binary ERC-1066 status code
     */
    function appCode(uint8 appReason) public pure returns (byte status) {
        return byte(160 + appReason);
    }

    /**
     * @dev Construct an application-specific status code
     *
     * @param Application-specific reason enum
     * @return Binary ERC-1066 status code
     */
    function appCode(Reason appReason) public pure returns (byte status) {
        return appCode(uint8(appReason));
    }

    /////////////////////////////// Get Nibbles ////////////////////////////////

    /**
     * @dev Extract the category from a status code
     *
     * @param Binary ERC-1066 status code
     * @return Category nibble
     */
    function categoryOf(byte status) public pure returns (byte category) {
        return status >> 4;
    }

    /**
     * @dev Extract the category from a status code enum
     *
     * @param Status enum
     * @return Category nibble
     */
    function categoryOf(Status status) public pure returns (byte category) {
        return categoryOf(byte(uint8(status)));
    }

    /**
     * @dev Extract the reason from a status code
     *
     * @param Binary ERC-1066 status code
     * @return Reason nibble
     */
    function reasonOf(byte status) public pure returns (byte reason) {
        return status & 0x0F;
    }

    /**
     * @dev Extract the reason from a status code enum
     *
     * @param Status enum
     * @return Reason nibble
     */
    function reasonOf(Status status) public pure returns (byte reason) {
        return reasonOf(byte(uint8(status)));
    }

    /**
     * @dev Decompose a status code into its category and reason nibbles
     *
     * @param Binary ERC-1066 status code
     * @return Category nibble
     * @return Reason nibble
     */
    function split(byte status) public returns (byte category, byte reason) {
        return (categoryOf(status), reasonOf(status));
    }

    ////////////////////////////// Localization ////////////////////////////////

    /**
     * @dev Lookup an ERC-1444 localization for a particular status code
     *
     * @param Binary ERC-1066 status code
     * @param The localization registry / proxy contract
     * @return If the loicalization string was found
               (`false` if a fallback was used)
     * @return The localization string
     */
    function localizeBy(byte status, LocalizationPreferences prefs)
        view
        public
        returns (bool found, string memory _msg)
    {
        return prefs.textFor(status);
    }

    ////////////////////////// Check Common Statuses ///////////////////////////

    /**
     * @dev Check if a status code is non-blocking (ie: an odd number)
     *
     * @param Binary ERC-1066 status code
     * @return A boolean representing if the status code is okay / nonblocking
     */
    function isOk(byte status) public pure returns (bool) {
        return (uint8(status) % 2) == 1;
    }

    /**
     * @dev Check if a status code is blocking (ie: an even number)
     *
     * @param Binary ERC-1066 status code
     * @return A boolean representing if the status code is blocking
     */
    function isBlocking(byte status) public pure returns (bool) {
        return !isOk(status);
    }

    /**
     * @dev Check if a status code represents success (ie: 0x*1)
     *
     * @param Binary ERC-1066 status code
     * @return A boolean representing if the status code represents success
     */
    function isSuccess(byte status) public pure returns (bool) {
        return reasonOf(status) == 0x01;
    }

    /**
     * @dev Check if a status code represents failure (ie: 0x*0)
     *
     * @param Binary ERC-1066 status code
     * @return A boolean representing if the status code represents failure
     */
    function isFailure(byte status) public pure returns (bool) {
        return reasonOf(status) == 0x00;
    }

    /**
     * @dev Check if a status code belongs to a particular category
     *
     * @param Binary ERC-1066 status code
     * @param Category nibble
     * @return A boolean representing if the status code belongs to
     *         the target category
     */
    function isCategory(byte status, byte category) public pure returns (bool) {
        return categoryOf(status) == category;
    }

    /**
     * @dev Check if a status code belongs to a particular category
     *
     * @param Binary ERC-1066 status code
     * @param Category enum
     * @return A boolean representing if the status code belongs to
     *         the target category
     */
    function isCategory(byte status, Category category) public pure returns (bool) {
        return categoryOf(status) == byte(uint8(category));
    }

    /**
     * @dev Check if a Status enum belongs to a particular category
     *
     * @param Status enum
     * @param Category enum
     * @return A boolean representing if the status enum belongs to
     *         the target category
     */
    function isCategory(Status status, Category category) public pure returns (bool) {
        return categoryOf(status) == byte(uint8(category));
    }

    /**
     * @dev Check if a status code has a particular reason
     *
     * @param Binary ERC-1066 status code
     * @param Reason nibble
     * @return A boolean representing if the status code has the target reason
     */
    function isReason(byte status, byte reason) public pure returns (bool) {
        return reasonOf(status) == reason;
    }

    /**
     * @dev Check if a status code belongs to a particular category
     *
     * @param Binary ERC-1066 status code
     * @param Reason enum
     * @return A boolean representing if the status code has the target reason
     */
    function isReason(byte status, Reason reason) public pure returns (bool) {
        return reasonOf(status) == byte(uint8(reason));
    }

    /**
     * @dev Check if a Status enum has a particular reason
     *
     * @param Status enum
     * @param Reason enum
     * @return A boolean representing if the status code has the target reason
     */
    function isReason(Status status, Reason reason) public pure returns (bool) {
        return reasonOf(status) == byte(uint8(reason));
    }

    ///////////////////////////////// Requires /////////////////////////////////

    /**
     * @dev Require that a status code be nonblocking, otherwise `revert`
     *
     * @param Binary ERC-1066 status code
     */
    function requireOk(byte status) public pure {
        require(isOk(status), "Blocking status code"); // TODO: use translation singleton
    }

    /**
     * @dev Require that a status code be nonblocking,
     *      otherwise `revert` with message
     *
     * @param Binary ERC-1066 status code
     * @param Revert message
     */
    function requireOk(byte status, string memory message) public pure {
        require(isOk(status), message);
    }

    /**
     * @dev Require that a status code be nonblocking,
     *      otherwise `revert` with an ERC-1444 automatically localized message
     *
     * @param Binary ERC-1066 status code
     * @param Localization preference registry
     */
    function requireOk(byte status, LocalizationPreferences prefs) public view {
        (bool _, string memory message) = localizeBy(status, prefs);
        requireOk(status, message);
    }

    /**
     * @dev Require that a status code represent success, otherwise `revert`
     *
     * @param Binary ERC-1066 status code
     */
    function requireSuccess(byte status) public pure {
        require(isSuccess(status), "Unsuccessful status code reason");
    }

    /**
     * @dev Require that a status code represent success,
     *      otherwise `revert` with message
     *
     * @param Binary ERC-1066 status code
     * @param Revert message
     */
    function requireSuccess(byte status, string memory message) public pure {
        require(isSuccess(status), message);
    }

    /**
     * @dev Require that a status code represent success,
     *      otherwise `revert` with an ERC-1444 automatically localized message
     *
     * @param Binary ERC-1066 status code
     * @param Localization preference registry
     */
    function requireSuccess(byte status, LocalizationPreferences prefs)
        public
        view
    {
        (bool _, string memory message) = localizeBy(status, prefs);
        requireSuccess(status, message);
    }

    /**
     * @dev Require that a status code belongs to a particular category,
     *      otherwise `revert`
     *
     * @param Binary ERC-1066 status code
     */
    function requireCategory(byte status, byte category) public view {
        require(isCategory(status, category));
    }

    /**
     * @dev Require that a status code belongs to a particular category,
     *      otherwise `revert` with message
     *
     * @param Binary ERC-1066 status code
     * @param Revert message
     */
    function requireCategory(byte status, byte category, string memory message)
        public
        view
    {
        require(isCategory(status, category), message);
    }

    /**
     * @dev Require that a status code belongs to a particular category,
     *      otherwise `revert` with an ERC-1444 automatically localized message
     *
     * @param Binary ERC-1066 status code
     * @param Localization preference registry
     */
    function requireCategory(
        byte status,
        byte category,
        LocalizationPreferences prefs
    )
        public
        view
    {
        (bool _, string memory message) = localizeBy(status, prefs);
        requireCategory(status, category, message);
    }

    /**
     * @dev Require that a status code has a particular reason,
     *      otherwise `revert`
     *
     * @param Binary ERC-1066 status code
     */
    function requireReason(byte status, byte reason) public view {
        require(isReason(status, reason));
    }

    /**
     * @dev Require that a status code has a particular reason,
     *      otherwise `revert` with message
     *
     * @param Binary ERC-1066 status code
     * @param Revert message
     */
    function requireReason(byte status, byte reason, string memory message)
        public
        view
    {
        require(isReason(status, reason), message);
    }

    /**
     * @dev Require that a status code has a particular reason,
     *      otherwise `revert` with an ERC-1444 automatically localized message
     *
     * @param Binary ERC-1066 status code
     * @param Localization preference registry
     */
    function requireReason(
        byte status,
        byte reason,
        LocalizationPreferences prefs
    )
        public
        view
    {
        (bool _, string memory message) = localizeBy(status, prefs);
        requireReason(status, reason, message);
    }
}
