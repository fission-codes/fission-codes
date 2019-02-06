pragma solidity ^0.5.0;

import { LocalizationPreferences} from "/ethereum-localized-messaging/contracts/LocalizationPreferences.sol";
import { FissionLocalization } from "./localization/FissionLocalization.sol";

/**
 * @title FISSION status code library
 *
 * @dev Implementation of broadly applicable status codes for smart contracts.
 * https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1066.md
 */
library FISSION {

    ///////////////////////////// Decomposed Enums /////////////////////////////

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

    enum Status {
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
     * @param Status enum tag
     * @return Binary ERC-1066 status code
     */
    function code(Status statusEnum) public pure returns (byte status) {
        return byte(uint8(statusEnum));
    }

    /**
     * @dev Construct a status code from a category and reason (ie: an inclusion)
     *
     * @param Category nibble
     * @param Reason nibble
     * @return Binary ERC-1066 status code
     */
    function code(byte category, byte reason)
        public
        pure
        returns (byte status)
    {
        return (category << 4) | (byte(0x0F) & reason);
    }

    /**
     * @dev Construct a status code from a category and reason (ie: an inclusion)
     *
     * @param Category
     * @param Reason
     * @return Binary ERC-1066 status code
     */
    function code(uint8 category, uint8 reason)
        public
        pure
        returns (byte status)
    {
        return byte(uint8((category << 4) + reason));
    }

    /**
     * @dev Construct a status code from category and reason enums (ie: an inclusion)
     *
     * @param Category nibble
     * @param Reason nibble
     * @return Binary ERC-1066 status code
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
     * @param Application-specific reason nibble
     * @return Binary ERC-1066 status code
     */
    function appCode(byte appReason) public pure returns (byte status) {
        return 0xA0 | appReason;
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

    function localizeBy(byte status, LocalizationPreferences prefs)
        view
        public
        returns (bool found, string memory _msg)
    {
        return prefs.textFor(status);
    }

    // Check common statuses

    function isOk(byte status) public pure returns (bool) {
        return (uint8(status) % 2) == 1;
    }

    function isBlocking(byte status) public pure returns (bool) {
        return !isOk(status);
    }

    function isSuccess(byte status) public pure returns (bool) {
        return reasonOf(status) == 0x1;
    }

    function isFailure(byte status) public pure returns (bool) {
        return reasonOf(status) == 0x0;
    }

    function isCategory(byte status, byte category) public pure returns (bool) {
        returns categoryOf(status) == category;
    }

    function isReason(byte status, byte reason) public pure returns (bool) {
        returns categoryOf(status) == reason;
    }

    // `require`s

    function requireOk(byte status) public pure {
        require(isOk(status), "Blocking status code"); // TODO: use translation singleton
    }

    function requireOk(byte status, string memory message) public pure {
        require(isOk(status), message);
    }

    function requireOk(byte status, LocalizationPreferences prefs) public view {
        (bool _, string memory message) = localizeBy(status, prefs);
        requireOk(status, message);
    }

    function requireSuccess(byte status) public pure {
        require(isSuccess(status), "Unsuccessful status code reason");
    }

    function requireSuccess(byte status, string memory message) public pure {
        require(isSuccess(status), message);
    }

    function requireSuccess(byte status, LocalizationPreferences prefs)
        public
        view
    {
        (bool _, string memory message) = localizeBy(status, prefs);
        requireSuccess(status, message);
    }

    function requireCategory(byte status, byte category) public view {
        require(isCategory(status, category));
    }

    function requireCategory(byte status, byte category, string memory message)
        public
        view
    {
        require(isCategory(status, category), message);
    }

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

    function requireReason(byte status, byte reason) public view {
        require(isReason(status, reason));
    }

    function requireReason(byte status, byte reason, string memory message)
        public
        view
    {
        require(isReason(status, reason), message);
    }

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
