import React from 'react'
import Link from 'gatsby-link'

const IndexPage = () => (
    <div>
        <h1 id="esc">ESC <code>. ... -.-.</code></h1>

        <h2 id="ethereumstatuscodes">Ethereum Status Codes</h2>

        <p>Broadly applicable status codes for Ethereum smart contracts</p>

        <h1 id="motivation">Motivation</h1>

        <h2 id="autonomy">Autonomy</h2>

        <p>Smart contracts are largely intended to be autonomous. While each contract may
            define a specific interface, having a common set of semantic codes can help
            developers write code that can react appropriately to various situations.</p>

        <h2 id="semanticallyrich">Semantically Rich</h2>

        <p>HTTP status codes are widely used for this purpose. BEAM languages use atoms
            and tagged tuples to signify much the same information. Both provide a lot of
            information both to the programmer (debugging for instance), and to the program
            that needs to decide what to do next.</p>

        <p>ESCs convey a much richer set of information than booleans,
            and are able to be reacted to autonomously unlike arbitrary strings.</p>

        <h2 id="userfeedback">User Feedback</h2>

        <p>Since status codes are finite and known in advance, we can provide global,
            human-readable sets of status messages. These may also be translated into any language,
            differing levels of technical detail, added as <code>revert</code> messages, natspecs, and so on.</p>

        <p>We also see a desire for this <a href="http://eips.ethereum.org/EIPS/eip-658">in transactions</a>,
    and there's no reason that ESCs couldn't be used by the EVM itself.</p>

    <h1 id="approach">Approach</h1>

    <h2 id="encoding">Encoding</h2>

    <p>ESCs are encoded as a <code>byte</code>. Hex values break nicely into high and low nibbles:
        <code>category</code> and <code>reason</code>. For instance, <code>hex"01"</code> stands for general success
        and <code>hex"00"</code> for general failure.</p>

    <p><code>byte</code> is quite lightweight, and can be easily packed with multiple codes into
        a <code>bytes32</code> (or similar) if desired. It is also easily interoperable with <code>uint8</code>,
    cast from <code>enum</code>s, and so on.</p>

    <h2 id="humanreadable">Human Readable</h2>

    <p>Developers should not be required to memorize 256 codes. However, they break nicely into a table.
        Cognitive load is lowered by organizing the table into categories and reasons.
        <code>0x10</code> and <code>0x11</code> belong to the same category, and <code>0x04</code> shares a reason with <code>0x24</code></p>

    <p>While this repository includes helper enums, we have found working directly in
        the hex values to be quite natural. ESC <code>0x10</code> is just as comfortable as HTTP 401, for example.</p>

    <h2 id="extensiblilty">Extensiblilty</h2>

    <p>The <code>0xA</code> category is reserved for application-specific statuses.
        In the case that 256 codes become insufficient, <code>bytes1</code> my be embedded in larger byte arrays.</p>

    <h2 id="simple-summary">Simple Summary</h2>

    <p>Broadly applicable status codes for Ethereum smart contracts.</p>

    <h2 id="abstract">Abstract</h2>

    <p>This standard outlines a common set of Ethereum status codes (ESC) in the same
        vein as HTTP statuses. This provides a shared set of signals to allow smart contracts
        to react to situations autonomously, expose localized error messages to users, and so on.</p>

    <p>The current state of the art is to either <code class="highlighter-rouge">revert</code> and require human intervention,
        or return a Boolean pass/fail status. Status codes are similar-but-orthogonal
        to <code class="highlighter-rouge">revert</code>ing with a reason, but aimed at automation and translation.</p>

    <p>As is the case with HTTP, having a standard set of known codes has many benefits for developers.
        They remove friction from needing to develop your own schemes for every contract,
        makes inter-contract automation easier, and makes it easier to broadly understand
        which of the finite states your request produced. Importantly, it makes it much easier
        to distinguish between expected errors states, and truly exceptional conditions
        that require halting execution.</p>

    <h2 id="motivation">Motivation</h2>

    <h3 id="autonomy">Autonomy</h3>

    <p>Smart contracts are largely intended to be autonomous. While each contract may
        define a specific interface, having a common set of semantic codes can help
        developers write code that can react appropriately to various situations.</p>

    <h3 id="semantic-density">Semantic Density</h3>

    <p>HTTP status codes are widely used for this purpose. BEAM languages use atoms
        and tagged tuples to signify much the same information. Both provide a lot of
        information both to the programmer (debugging for instance), and to the program
        that needs to decide what to do next.</p>

    <p>ESCs convey a much richer set of information than Booleans,
        and are able to be reacted to autonomously unlike arbitrary strings.</p>

    <h3 id="user-feedback">User Feedback</h3>

    <p>Since status codes are finite and known in advance, we can provide global,
        human-readable sets of status messages. These may also be translated into any language,
        differing levels of technical detail, added as <code class="highlighter-rouge">revert</code> messages, natspecs, and so on.</p>

    <p>We also see a desire for this <a href="http://eips.ethereum.org/EIPS/eip-658">in transactions</a>,
                  and there’s no reason that ESCs couldn’t be used by the EVM itself.</p>

                  <h3 id="more-than-passfail">More than Pass/Fail</h3>

                  <p>While clearly related, status codes are complementary to “revert with reason”.
                      ESCs are not limited to rolling back the transaction, and may represent known error states
                      without halting execution. They may also represent off-chain conditions,
                      supply a string to revert, signal time delays, and more.</p>

                  <h2 id="specification">Specification</h2>

                  <h3 id="format">Format</h3>

                  <p>Codes are returned as the first value of potentially multiple return values.</p>

                  <pre><code class="language-solidity">{`
                      // Status only

                      function isInt(uint num) public pure returns (byte status) {
                          return hex"01";
                      }

                      // Status and value

                      uint8 private counter;

                      function safeIncrement(uint8 interval) public returns (byte status, uint8 newCounter) {
                          uint8 updated = counter + interval;

                          if (updated &gt;= counter) {
                              counter = updated;
                              return (hex"01", updated);
                          } else {
                              return (hex"00", counter);
                          }
                      }
                      `}
                  </code></pre>

                  <p>In the rare case that there are multiple codes required to express an idea,
                      they should be organized in ascending order.</p>

                  <h3 id="code-table">Code Table</h3>

                  <p>Codes break nicely into a 16x16 matrix, represented as a 2-digit hex number.
                      The high nibble represents the code’s kind or “category”, and the low nibble contains
                      the state or “reason”. We present them below as separate tables per range for
                      explanatory and layout reasons.</p>

                  <p>Unspecified codes are <em>not</em> free for arbitrary use, but rather open for further specification.</p>

                  <h4 id="generic">Generic</h4>

                  <p>General codes. These double as bare “reasons”, since <code class="highlighter-rouge">0x01 == 1</code>.</p>

                  <table>
                      <thead>
                          <tr>
                              <th>Code</th>
                              <th style={{textAlign: 'left'}}>Description</th>
                          </tr>
                      </thead>
                      <tbody>
                          <tr>
                              <td><code class="highlighter-rouge">0x00</code></td>
                              <td style={{textAlign: 'left'}}>Failure</td>
                          </tr>
                          <tr>
                              <td><code class="highlighter-rouge">0x01</code></td>
                              <td style={{textAlign: 'left'}}>Success</td>
                          </tr>
                          <tr>
                              <td><code class="highlighter-rouge">0x02</code></td>
                              <td style={{textAlign: 'left'}}>Accepted / Started</td>
                          </tr>
                          <tr>
                              <td><code class="highlighter-rouge">0x03</code></td>
                              <td style={{textAlign: 'left'}}>Awaiting / Before</td>
                          </tr>
                          <tr>
                              <td><code class="highlighter-rouge">0x04</code></td>
                              <td style={{textAlign: 'left'}}>Action Required</td>
                          </tr>
                          <tr>
                              <td><code class="highlighter-rouge">0x05</code></td>
                              <td style={{textAlign: 'left'}}>Expired</td>
                          </tr>
                          <tr>
                              <td><code class="highlighter-rouge">0x06</code></td>
                              <td style={{textAlign: 'left'}}>&nbsp;</td>
                          </tr>
                          <tr>
                              <td><code class="highlighter-rouge">0x07</code></td>
                              <td style={{textAlign: 'left'}}>&nbsp;</td>
                          </tr>
                          <tr>
                              <td><code class="highlighter-rouge">0x08</code></td>
                              <td style={{textAlign: 'left'}}>&nbsp;</td>
                          </tr>
                          <tr>
                              <td><code class="highlighter-rouge">0x09</code></td>
                              <td style={{textAlign: 'left'}}>&nbsp;</td>
                          </tr>
                          <tr>
                              <td><code class="highlighter-rouge">0x0A</code></td>
                              <td style={{textAlign: 'left'}}>&nbsp;</td>
                          </tr>
                          <tr>
                              <td><code class="highlighter-rouge">0x0B</code></td>
                              <td style={{textAlign: 'left'}}>&nbsp;</td>
                          </tr>
                          <tr>
                              <td><code class="highlighter-rouge">0x0C</code></td>
                              <td style={{textAlign: 'left'}}>&nbsp;</td>
                          </tr>
                          <tr>
                              <td><code class="highlighter-rouge">0x0D</code></td>
                              <td style={{textAlign: 'left'}}>&nbsp;</td>
                          </tr>
                          <tr>
                              <td><code class="highlighter-rouge">0x0E</code></td>
                              <td style={{textAlign: 'left'}}>&nbsp;</td>
                          </tr>
                          <tr>
                              <td><code class="highlighter-rouge">0x0F</code></td>
                              <td style={{textAlign: 'left'}}>Meta or Info Only</td>
                          </tr>
                      </tbody>
                  </table>

                  <h4 id="permission">Permission</h4>

                  <p>Related to permisson, authorization, approval, and so on.</p>

                  <table>
                      <thead>
                          <tr>
                              <th>Code</th>
                              <th style={{textAlign: 'left'}}>Description</th>
                          </tr>
                      </thead>
                      <tbody>
                          <tr>
                              <td><code class="highlighter-rouge">0x10</code></td>
                              <td style={{textAlign: 'left'}}>Disallowed</td>
                          </tr>
                          <tr>
                              <td><code class="highlighter-rouge">0x11</code></td>
                              <td style={{textAlign: 'left'}}>Allowed</td>
                          </tr>
                          <tr>
                              <td><code class="highlighter-rouge">0x12</code></td>
                              <td style={{textAlign: 'left'}}>Requested Permission</td>
                          </tr>
                          <tr>
                              <td><code class="highlighter-rouge">0x13</code></td>
                              <td style={{textAlign: 'left'}}>Awaiting Permission</td>
                          </tr>
                          <tr>
                              <td><code class="highlighter-rouge">0x14</code></td>
                              <td style={{textAlign: 'left'}}>Awaiting Your Permission</td>
                          </tr>
                          <tr>
                              <td><code class="highlighter-rouge">0x15</code></td>
                              <td style={{textAlign: 'left'}}>No Longer Allowed</td>
                          </tr>
                          <tr>
                              <td><code class="highlighter-rouge">0x16</code></td>
                              <td style={{textAlign: 'left'}}>&nbsp;</td>
                          </tr>
                          <tr>
                              <td><code class="highlighter-rouge">0x17</code></td>
                              <td style={{textAlign: 'left'}}>&nbsp;</td>
                          </tr>
                          <tr>
                              <td><code class="highlighter-rouge">0x18</code></td>
                              <td style={{textAlign: 'left'}}>&nbsp;</td>
                          </tr>
                          <tr>
                              <td><code class="highlighter-rouge">0x19</code></td>
                              <td style={{textAlign: 'left'}}>&nbsp;</td>
                          </tr>
                          <tr>
                              <td><code class="highlighter-rouge">0x1A</code></td>
                              <td style={{textAlign: 'left'}}>&nbsp;</td>
                          </tr>
                          <tr>
                              <td><code class="highlighter-rouge">0x1B</code></td>
                              <td style={{textAlign: 'left'}}>&nbsp;</td>
                          </tr>
                          <tr>
                              <td><code class="highlighter-rouge">0x1C</code></td>
                              <td style={{textAlign: 'left'}}>&nbsp;</td>
                          </tr>
                          <tr>
                              <td><code class="highlighter-rouge">0x1D</code></td>
                              <td style={{textAlign: 'left'}}>&nbsp;</td>
                          </tr>
                          <tr>
                              <td><code class="highlighter-rouge">0x1E</code></td>
                              <td style={{textAlign: 'left'}}>&nbsp;</td>
                          </tr>
                          <tr>
                              <td><code class="highlighter-rouge">0x1F</code></td>
                              <td style={{textAlign: 'left'}}>Permission Meta or Info</td>
                          </tr>
                      </tbody>
                  </table>

                  <h4 id="find-match-c">Find, Match, &amp;c</h4>

                  <p>This range is broadly intended for finding and matching.
                      Data lookups and order matching are two common use cases.</p>

                  <table>
                      <thead>
                          <tr>
                              <th>Code</th>
                              <th style={{textAlign: 'left'}}>Description</th>
                          </tr>
                      </thead>
                      <tbody>
                          <tr>
                              <td><code class="highlighter-rouge">0x20</code></td>
                              <td style={{textAlign: 'left'}}>Not Found</td>
                          </tr>
                          <tr>
                              <td><code class="highlighter-rouge">0x21</code></td>
                              <td style={{textAlign: 'left'}}>Found</td>
                          </tr>
                          <tr>
                              <td><code class="highlighter-rouge">0x22</code></td>
                              <td style={{textAlign: 'left'}}>Match Request Sent</td>
                          </tr>
                          <tr>
                              <td><code class="highlighter-rouge">0x23</code></td>
                              <td style={{textAlign: 'left'}}>Awaiting Match</td>
                          </tr>
                          <tr>
                              <td><code class="highlighter-rouge">0x24</code></td>
                              <td style={{textAlign: 'left'}}>Match Request Received</td>
                          </tr>
                          <tr>
                              <td><code class="highlighter-rouge">0x25</code></td>
                              <td style={{textAlign: 'left'}}>Out of Range</td>
                          </tr>
                          <tr>
                              <td><code class="highlighter-rouge">0x26</code></td>
                              <td style={{textAlign: 'left'}}>&nbsp;</td>
                          </tr>
                          <tr>
                              <td><code class="highlighter-rouge">0x27</code></td>
                              <td style={{textAlign: 'left'}}>&nbsp;</td>
                          </tr>
                          <tr>
                              <td><code class="highlighter-rouge">0x28</code></td>
                              <td style={{textAlign: 'left'}}>&nbsp;</td>
                          </tr>
                          <tr>
                              <td><code class="highlighter-rouge">0x29</code></td>
                              <td style={{textAlign: 'left'}}>&nbsp;</td>
                          </tr>
                          <tr>
                              <td><code class="highlighter-rouge">0x2A</code></td>
                              <td style={{textAlign: 'left'}}>&nbsp;</td>
                          </tr>
                          <tr>
                              <td><code class="highlighter-rouge">0x2B</code></td>
                              <td style={{textAlign: 'left'}}>&nbsp;</td>
                          </tr>
                          <tr>
                              <td><code class="highlighter-rouge">0x2C</code></td>
                              <td style={{textAlign: 'left'}}>&nbsp;</td>
                          </tr>
                          <tr>
                              <td><code class="highlighter-rouge">0x2D</code></td>
                              <td style={{textAlign: 'left'}}>&nbsp;</td>
                          </tr>
                          <tr>
                              <td><code class="highlighter-rouge">0x2E</code></td>
                              <td style={{textAlign: 'left'}}>&nbsp;</td>
                          </tr>
                          <tr>
                              <td><code class="highlighter-rouge">0x2F</code></td>
                              <td style={{textAlign: 'left'}}>Matching Meta or Info</td>
                          </tr>
                      </tbody>
                  </table>

                  <h4 id="negotiation-terms-and-offers">Negotiation, Terms, and Offers</h4>

                  <p>Negotiation, and very broadly the flow of such transactions.
                      Note that “other party” may be more than one actor (not necessarily the sender).</p>

                  <table>
                      <thead>
                          <tr>
                              <th>Code</th>
                              <th style={{textAlign: 'left'}}>Description</th>
                          </tr>
                      </thead>
                      <tbody>
                          <tr>
                              <td><code class="highlighter-rouge">0x30</code></td>
                              <td style={{textAlign: 'left'}}>Other Party Disagreed</td>
                          </tr>
                          <tr>
                              <td><code class="highlighter-rouge">0x31</code></td>
                              <td style={{textAlign: 'left'}}>Other Party Agreed</td>
                          </tr>
                          <tr>
                              <td><code class="highlighter-rouge">0x32</code></td>
                              <td style={{textAlign: 'left'}}>Sent Offer</td>
                          </tr>
                          <tr>
                              <td><code class="highlighter-rouge">0x33</code></td>
                              <td style={{textAlign: 'left'}}>Awaiting Their Ratification</td>
                          </tr>
                          <tr>
                              <td><code class="highlighter-rouge">0x34</code></td>
                              <td style={{textAlign: 'left'}}>Awaiting Your Ratification</td>
                          </tr>
                          <tr>
                              <td><code class="highlighter-rouge">0x35</code></td>
                              <td style={{textAlign: 'left'}}>Offer Expired</td>
                          </tr>
                          <tr>
                              <td><code class="highlighter-rouge">0x36</code></td>
                              <td style={{textAlign: 'left'}}>&nbsp;</td>
                          </tr>
                          <tr>
                              <td><code class="highlighter-rouge">0x37</code></td>
                              <td style={{textAlign: 'left'}}>&nbsp;</td>
                          </tr>
                          <tr>
                              <td><code class="highlighter-rouge">0x38</code></td>
                              <td style={{textAlign: 'left'}}>&nbsp;</td>
                          </tr>
                          <tr>
                              <td><code class="highlighter-rouge">0x39</code></td>
                              <td style={{textAlign: 'left'}}>&nbsp;</td>
                          </tr>
                          <tr>
                              <td><code class="highlighter-rouge">0x3A</code></td>
                              <td style={{textAlign: 'left'}}>&nbsp;</td>
                          </tr>
                          <tr>
                              <td><code class="highlighter-rouge">0x3B</code></td>
                              <td style={{textAlign: 'left'}}>&nbsp;</td>
                          </tr>
                          <tr>
                              <td><code class="highlighter-rouge">0x3C</code></td>
                              <td style={{textAlign: 'left'}}>&nbsp;</td>
                          </tr>
                          <tr>
                              <td><code class="highlighter-rouge">0x3D</code></td>
                              <td style={{textAlign: 'left'}}>&nbsp;</td>
                          </tr>
                          <tr>
                              <td><code class="highlighter-rouge">0x3E</code></td>
                              <td style={{textAlign: 'left'}}>&nbsp;</td>
                          </tr>
                          <tr>
                              <td><code class="highlighter-rouge">0x3F</code></td>
                              <td style={{textAlign: 'left'}}>Negotiation Meta or Info</td>
                          </tr>
                      </tbody>
                  </table>

                  <h4 id="availability">Availability</h4>

                  <p>Service or action availability.</p>

                  <table>
                      <thead>
                          <tr>
                              <th>Code</th>
                              <th style={{textAlign: 'left'}}>Description</th>
                          </tr>
                      </thead>
                      <tbody>
                          <tr>
                              <td><code class="highlighter-rouge">0x40</code></td>
                              <td style={{textAlign: 'left'}}>Unavailable</td>
                          </tr>
                          <tr>
                              <td><code class="highlighter-rouge">0x41</code></td>
                              <td style={{textAlign: 'left'}}>Available</td>
                          </tr>
                          <tr>
                              <td><code class="highlighter-rouge">0x42</code></td>
                              <td style={{textAlign: 'left'}}>You May Begin</td>
                          </tr>
                          <tr>
                              <td><code class="highlighter-rouge">0x43</code></td>
                              <td style={{textAlign: 'left'}}>Not Yet Available</td>
                          </tr>
                          <tr>
                              <td><code class="highlighter-rouge">0x44</code></td>
                              <td style={{textAlign: 'left'}}>Awaiting Your Availability</td>
                          </tr>
                          <tr>
                              <td><code class="highlighter-rouge">0x45</code></td>
                              <td style={{textAlign: 'left'}}>No Longer Available</td>
                          </tr>
                          <tr>
                              <td><code class="highlighter-rouge">0x46</code></td>
                              <td style={{textAlign: 'left'}}>&nbsp;</td>
                          </tr>
                          <tr>
                              <td><code class="highlighter-rouge">0x47</code></td>
                              <td style={{textAlign: 'left'}}>&nbsp;</td>
                          </tr>
                          <tr>
                              <td><code class="highlighter-rouge">0x48</code></td>
                              <td style={{textAlign: 'left'}}>&nbsp;</td>
                          </tr>
                          <tr>
                              <td><code class="highlighter-rouge">0x49</code></td>
                              <td style={{textAlign: 'left'}}>&nbsp;</td>
                          </tr>
                          <tr>
                              <td><code class="highlighter-rouge">0x4A</code></td>
                              <td style={{textAlign: 'left'}}>&nbsp;</td>
                          </tr>
                          <tr>
                              <td><code class="highlighter-rouge">0x4B</code></td>
                              <td style={{textAlign: 'left'}}>&nbsp;</td>
                          </tr>
                          <tr>
                              <td><code class="highlighter-rouge">0x4C</code></td>
                              <td style={{textAlign: 'left'}}>&nbsp;</td>
                          </tr>
                          <tr>
                              <td><code class="highlighter-rouge">0x4D</code></td>
                              <td style={{textAlign: 'left'}}>&nbsp;</td>
                          </tr>
                          <tr>
                              <td><code class="highlighter-rouge">0x4E</code></td>
                              <td style={{textAlign: 'left'}}>&nbsp;</td>
                          </tr>
                          <tr>
                              <td><code class="highlighter-rouge">0x4F</code></td>
                              <td style={{textAlign: 'left'}}>Availability Meta or Info</td>
                          </tr>
                      </tbody>
                  </table>

                  <h4 id="0x5_-tbd"><code class="highlighter-rouge">0x5_</code> TBD</h4>

                  <p>Currently unspecified</p>

                  <h4 id="0x6_-tbd"><code class="highlighter-rouge">0x6_</code> TBD</h4>

                  <p>Currently unspecified</p>

                  <h4 id="0x7_-tbd"><code class="highlighter-rouge">0x7_</code> TBD</h4>

                  <p>Currently unspecified</p>

                  <h4 id="0x8_-tbd"><code class="highlighter-rouge">0x8_</code> TBD</h4>

                  <p>Currently unspecified</p>

                  <h4 id="0x9_-tbd"><code class="highlighter-rouge">0x9_</code> TBD</h4>

                  <p>Currently unspecified</p>

                  <h4 id="application-specific-codes">Application-Specific Codes</h4>

                  <p>Contracts may have special states that they need to signal.
                      This proposal only outlines the broadest meanings, but implementers may have very
                      specific meanings for each, as long as they are coherent with the broader definition.</p>

                  <table>
                      <thead>
                          <tr>
                              <th>Code</th>
                              <th style={{textAlign: 'left'}}>Description</th>
                          </tr>
                      </thead>
                      <tbody>
                          <tr>
                              <td><code class="highlighter-rouge">0xA0</code></td>
                              <td style={{textAlign: 'left'}}>App-Specific Failure</td>
                          </tr>
                          <tr>
                              <td><code class="highlighter-rouge">0xA1</code></td>
                              <td style={{textAlign: 'left'}}>App-Specific Success</td>
                          </tr>
                          <tr>
                              <td><code class="highlighter-rouge">0xA2</code></td>
                              <td style={{textAlign: 'left'}}>App-Specific Acceptance / Start</td>
                          </tr>
                          <tr>
                              <td><code class="highlighter-rouge">0xA3</code></td>
                              <td style={{textAlign: 'left'}}>App-Specific Awaiting / Before</td>
                          </tr>
                          <tr>
                              <td><code class="highlighter-rouge">0xA4</code></td>
                              <td style={{textAlign: 'left'}}>App-Specific Action Required</td>
                          </tr>
                          <tr>
                              <td><code class="highlighter-rouge">0xA5</code></td>
                              <td style={{textAlign: 'left'}}>App-Specific Expiry</td>
                          </tr>
                          <tr>
                              <td><code class="highlighter-rouge">0xA6</code></td>
                              <td style={{textAlign: 'left'}}>&nbsp;</td>
                          </tr>
                          <tr>
                              <td><code class="highlighter-rouge">0xA7</code></td>
                              <td style={{textAlign: 'left'}}>&nbsp;</td>
                          </tr>
                          <tr>
                              <td><code class="highlighter-rouge">0xA8</code></td>
                              <td style={{textAlign: 'left'}}>&nbsp;</td>
                          </tr>
                          <tr>
                              <td><code class="highlighter-rouge">0xA9</code></td>
                              <td style={{textAlign: 'left'}}>&nbsp;</td>
                          </tr>
                          <tr>
                              <td><code class="highlighter-rouge">0xAA</code></td>
                              <td style={{textAlign: 'left'}}>&nbsp;</td>
                          </tr>
                          <tr>
                              <td><code class="highlighter-rouge">0xAB</code></td>
                              <td style={{textAlign: 'left'}}>&nbsp;</td>
                          </tr>
                          <tr>
                              <td><code class="highlighter-rouge">0xAC</code></td>
                              <td style={{textAlign: 'left'}}>&nbsp;</td>
                          </tr>
                          <tr>
                              <td><code class="highlighter-rouge">0xAD</code></td>
                              <td style={{textAlign: 'left'}}>&nbsp;</td>
                          </tr>
                          <tr>
                              <td><code class="highlighter-rouge">0xAE</code></td>
                              <td style={{textAlign: 'left'}}>&nbsp;</td>
                          </tr>
                          <tr>
                              <td><code class="highlighter-rouge">0xAF</code></td>
                              <td style={{textAlign: 'left'}}>App-Specific Meta or Info</td>
                          </tr>
                      </tbody>
                  </table>

                  <h4 id="0xb_-tbd"><code class="highlighter-rouge">0xB_</code> TBD</h4>

                  <p>Currently unspecified</p>

                  <h4 id="0xc_-tbd"><code class="highlighter-rouge">0xC_</code> TBD</h4>

                  <p>Currently unspecified</p>

                  <h4 id="0xd_-tbd"><code class="highlighter-rouge">0xD_</code> TBD</h4>

                  <p>Currently unspecified</p>

                  <h4 id="cryptography-and-authentication">Cryptography and Authentication</h4>

                  <p>Actions around signatures, cryptography, signing, and application-level authentication.</p>

                  <p>The meta code <code class="highlighter-rouge">0xEF</code> is often used to signal a payload descibing the algorithm
                      or process used.</p>

                  <table>
                      <thead>
                          <tr>
                              <th>Code</th>
                              <th style={{textAlign: 'left'}}>Description</th>
                          </tr>
                      </thead>
                      <tbody>
                          <tr>
                              <td><code class="highlighter-rouge">0xE0</code></td>
                              <td style={{textAlign: 'left'}}>Decrypt Failure</td>
                          </tr>
                          <tr>
                              <td><code class="highlighter-rouge">0xE1</code></td>
                              <td style={{textAlign: 'left'}}>Decrypt Success</td>
                          </tr>
                          <tr>
                              <td><code class="highlighter-rouge">0xE2</code></td>
                              <td style={{textAlign: 'left'}}>Signed</td>
                          </tr>
                          <tr>
                              <td><code class="highlighter-rouge">0xE3</code></td>
                              <td style={{textAlign: 'left'}}>Their Signature Required</td>
                          </tr>
                          <tr>
                              <td><code class="highlighter-rouge">0xE4</code></td>
                              <td style={{textAlign: 'left'}}>Your Signature Required</td>
                          </tr>
                          <tr>
                              <td><code class="highlighter-rouge">0xE5</code></td>
                              <td style={{textAlign: 'left'}}>Auth Expired</td>
                          </tr>
                          <tr>
                              <td><code class="highlighter-rouge">0xE6</code></td>
                              <td style={{textAlign: 'left'}}>&nbsp;</td>
                          </tr>
                          <tr>
                              <td><code class="highlighter-rouge">0xE7</code></td>
                              <td style={{textAlign: 'left'}}>&nbsp;</td>
                          </tr>
                          <tr>
                              <td><code class="highlighter-rouge">0xE8</code></td>
                              <td style={{textAlign: 'left'}}>&nbsp;</td>
                          </tr>
                          <tr>
                              <td><code class="highlighter-rouge">0xE9</code></td>
                              <td style={{textAlign: 'left'}}>&nbsp;</td>
                          </tr>
                          <tr>
                              <td><code class="highlighter-rouge">0xEA</code></td>
                              <td style={{textAlign: 'left'}}>&nbsp;</td>
                          </tr>
                          <tr>
                              <td><code class="highlighter-rouge">0xEB</code></td>
                              <td style={{textAlign: 'left'}}>&nbsp;</td>
                          </tr>
                          <tr>
                              <td><code class="highlighter-rouge">0xEC</code></td>
                              <td style={{textAlign: 'left'}}>&nbsp;</td>
                          </tr>
                          <tr>
                              <td><code class="highlighter-rouge">0xED</code></td>
                              <td style={{textAlign: 'left'}}>&nbsp;</td>
                          </tr>
                          <tr>
                              <td><code class="highlighter-rouge">0xEE</code></td>
                              <td style={{textAlign: 'left'}}>&nbsp;</td>
                          </tr>
                          <tr>
                              <td><code class="highlighter-rouge">0xEF</code></td>
                              <td style={{textAlign: 'left'}}>Crypto Info or Meta</td>
                          </tr>
                      </tbody>
                  </table>

                  <h4 id="0xf0-off-chain"><code class="highlighter-rouge">0xF0</code> Off-Chain</h4>

                  <p>For off-chain actions. Much like th <code class="highlighter-rouge">0x0_: Generic</code> range, <code class="highlighter-rouge">0xF_</code> is very general,
                      and does little to modify the reason.</p>

                  <p>Among other things, the meta code <code class="highlighter-rouge">0xFF</code> may be used to describe what the off-chain process is.</p>

                  <table>
                      <thead>
                          <tr>
                              <th>Code</th>
                              <th style={{textAlign: 'left'}}>Description</th>
                          </tr>
                      </thead>
                      <tbody>
                          <tr>
                              <td><code class="highlighter-rouge">0xF0</code></td>
                              <td style={{textAlign: 'left'}}>Off-Chain Failure</td>
                          </tr>
                          <tr>
                              <td><code class="highlighter-rouge">0xF1</code></td>
                              <td style={{textAlign: 'left'}}>Off-Chain Success</td>
                          </tr>
                          <tr>
                              <td><code class="highlighter-rouge">0xF2</code></td>
                              <td style={{textAlign: 'left'}}>Off-Chain Process Stared</td>
                          </tr>
                          <tr>
                              <td><code class="highlighter-rouge">0xF3</code></td>
                              <td style={{textAlign: 'left'}}>Awaiting Off-Chain Completion</td>
                          </tr>
                          <tr>
                              <td><code class="highlighter-rouge">0xF4</code></td>
                              <td style={{textAlign: 'left'}}>Off-Chain Action Required</td>
                          </tr>
                          <tr>
                              <td><code class="highlighter-rouge">0xF5</code></td>
                              <td style={{textAlign: 'left'}}>Off-Chain Service Unavailable</td>
                          </tr>
                          <tr>
                              <td><code class="highlighter-rouge">0xF6</code></td>
                              <td style={{textAlign: 'left'}}>&nbsp;</td>
                          </tr>
                          <tr>
                              <td><code class="highlighter-rouge">0xF7</code></td>
                              <td style={{textAlign: 'left'}}>&nbsp;</td>
                          </tr>
                          <tr>
                              <td><code class="highlighter-rouge">0xF8</code></td>
                              <td style={{textAlign: 'left'}}>&nbsp;</td>
                          </tr>
                          <tr>
                              <td><code class="highlighter-rouge">0xF9</code></td>
                              <td style={{textAlign: 'left'}}>&nbsp;</td>
                          </tr>
                          <tr>
                              <td><code class="highlighter-rouge">0xFA</code></td>
                              <td style={{textAlign: 'left'}}>&nbsp;</td>
                          </tr>
                          <tr>
                              <td><code class="highlighter-rouge">0xFB</code></td>
                              <td style={{textAlign: 'left'}}>&nbsp;</td>
                          </tr>
                          <tr>
                              <td><code class="highlighter-rouge">0xFC</code></td>
                              <td style={{textAlign: 'left'}}>&nbsp;</td>
                          </tr>
                          <tr>
                              <td><code class="highlighter-rouge">0xFD</code></td>
                              <td style={{textAlign: 'left'}}>&nbsp;</td>
                          </tr>
                          <tr>
                              <td><code class="highlighter-rouge">0xFE</code></td>
                              <td style={{textAlign: 'left'}}>&nbsp;</td>
                          </tr>
                          <tr>
                              <td><code class="highlighter-rouge">0xFF</code></td>
                              <td style={{textAlign: 'left'}}>Off-Chain Info or Meta</td>
                          </tr>
                      </tbody>
                  </table>

                  <h3 id="example-function-change">Example Function Change</h3>

                  <pre><code class="language-solidity">{`
                      uint256 private startTime;
                      mapping(address =&gt; uint) private counters;

                      // Before
                      function increase() public returns (bool _available) {
                          if (now &lt; startTime &amp;&amp; counters[msg.sender] == 0) {
                              return false;
                          };

                          counters[msg.sender] += 1;
                          return true;
                      }

                      // After
                      function increase() public returns (byte _status) {
                          if (now &lt; start) { return hex"43"; } // Not yet available
                          if (counters[msg.sender] == 0) { return hex"10"; } // Not authorized

                          counters[msg.sender] += 1;
                          return hex"01"; // Success
                      }
                      `}
                  </code></pre>

                  <h3 id="example-sequence-diagrams">Example Sequence Diagrams</h3>

                  <div class="highlighter-rouge"><div class="highlight"><pre class="highlight"><code>0x03 = Waiting
                      0x31 = Other Party (ie: not you) Agreed
                      0x41 = Available
                      0x43 = Not Yet Available


                      Exchange


                      AwesomeCoin                 DEX                     TraderBot
                      +                       +                          +
                      |                       |       buy(AwesomeCoin)   |
                      |                       | &lt;------------------------+
                      |         buy()         |                          |
                      | &lt;---------------------+                          |
                      |                       |                          |
                      |     Status [0x43]     |                          |
                      +---------------------&gt; |       Status [0x43]      |
                      |                       +------------------------&gt; |
                      |                       |                          |
                      |                       |        isDoneYet()       |
                      |                       | &lt;------------------------+
                      |                       |                          |
                      |                       |       Status [0x43]      |
                      |                       +------------------------&gt; |
                      |                       |                          |
                      |                       |                          |
                      |     Status [0x41]     |                          |
                      +---------------------&gt; |                          |
                      |                       |                          |
                      |       buy()           |                          |
                      | &lt;---------------------+                          |
                      |                       |                          |
                      |                       |                          |
                      |     Status [0x31]     |                          |
                      +---------------------&gt; |      Status [0x31]       |
                      |                       +------------------------&gt; |
                      |                       |                          |
                      |                       |                          |
                      |                       |                          |
                      |                       |                          |
                      +                       +                          +
                  </code></pre></div></div>

                  <div class="highlighter-rouge"><div class="highlight"><pre class="highlight"><code>0x01 = Generic Success
                      0x10 = Disallowed
                      0x11 = Allowed

                      Token Validation


                      Buyer                  RegulatedToken           TokenValidator               IDChecker          SpendLimiter
                      +                          +                         +                         +                   +
                      |        buy()             |                         |                         |                   |
                      +------------------------&gt; |          check()        |                         |                   |
                      |                          +-----------------------&gt; |          check()        |                   |
                      |                          |                         +-----------------------&gt; |                   |
                      |                          |                         |                         |                   |
                      |                          |                         |         Status [0x10]   |                   |
                      |                          |       Status [0x10]     | &lt;-----------------------+                   |
                      |        revert()          | &lt;-----------------------+                         |                   |
                      | &lt;------------------------+                         |                         |                   |
                      |                          |                         |                         |                   |
                      +---------------------------+           |                         |                         |                   |
                      |                           |           |                         |                         |                   |
                      | Updates ID with provider  |           |                         |                         |                   |
                      |                           |           |                         |                         |                   |
                      +---------------------------+           |                         |                         |                   |
                      |                          |                         |                         |                   |
                      |         buy()            |                         |                         |                   |
                      +------------------------&gt; |        check()          |                         |                   |
                      |                          +-----------------------&gt; |         check()         |                   |
                      |                          |                         +-----------------------&gt; |                   |
                      |                          |                         |                         |                   |
                      |                          |                         |       Status [0x11]     |                   |
                      |                          |                         | &lt;-----------------------+                   |
                      |                          |                         |                         |                   |
                      |                          |                         |                         |   check()         |
                      |                          |                         +-------------------------------------------&gt; |
                      |                          |                         |                         |                   |
                      |                          |                         |                         |  Status [0x11]    |
                      |                          |       Status [0x11]     | &lt;-------------------------------------------+
                      |        Status [0x01]     | &lt;-----------------------+                         |                   |
                      | &lt;------------------------+                         |                         |                   |
                      |                          |                         |                         |                   |
                      |                          |                         |                         |                   |
                      |                          |                         |                         |                   |
                      +                          +                         +                         +                   +
                  </code></pre></div></div>

                  <h2 id="rationale">Rationale</h2>

                  <h3 id="encoding">Encoding</h3>

                  <p>ESCs are encoded as a <code class="highlighter-rouge">byte</code>. Hex values break nicely into high and low nibbles:
                      <code class="highlighter-rouge">category</code> and <code class="highlighter-rouge">reason</code>. For instance, <code class="highlighter-rouge">hex"01"</code> stands for general success
                      and <code class="highlighter-rouge">hex"00"</code> for general failure.</p>

                  <p><code class="highlighter-rouge">byte</code> is quite lightweight, and can be easily packed with multiple codes into
                      a <code class="highlighter-rouge">bytes32</code> (or similar) if desired. It is also easily interoperable with <code class="highlighter-rouge">uint8</code>,
                                                                                          cast from <code class="highlighter-rouge">enum</code>s, and so on.</p>

                  <h4 id="alternatives">Alternatives</h4>

                  <p>Alternate schemes include <code class="highlighter-rouge">bytes32</code> and <code class="highlighter-rouge">uint8</code>. While these work reasonably
                      well, they have drawbacks.</p>

                  <p><code class="highlighter-rouge">uint8</code> feels even more similar to HTTP status codes, and enums don’t require
                      as much casting. However does not break as evenly as a square table
                      (256 doesn’t look as nice in base 10).</p>

                  <p>Packing multiple codes into a single <code class="highlighter-rouge">bytes32</code> is nice in theory, but poses additional
                      challenges. Unused space may be interpeted as <code class="highlighter-rouge">0x00 Failure</code>, you can only efficiently
    pack four codes at once, and there is a challenge in ensuring that code combinations
    are sensible. Forcing four codes into a packed representation encourages multiple
    status codes to be returned, which is often more information than strictly nessesary.
                                                                                        This can lead to paradoxical results (ex <code class="highlighter-rouge">0x00</code> and <code class="highlighter-rouge">0x01</code> together),
                                                                                        or greater resorces allocated to interpreting 256<sup>4</sup> (4.3 billion) permutations.</p>

                  <h3 id="multiple-returns">Multiple Returns</h3>

                  <p>While there may be cases where packing a byte array of ESCs may make sense, the simplest,
                      most forwards-compatible method of transmission is as the first value of a multiple return.</p>

                  <p>Familiarity is also a motivating factor. A consistent position and encoding together
                      follow the principle of least surprise. It is both viewable as a “header” in the HTTP analogy,
                      or like the “tag” in BEAM tagged tupples.</p>

                  <h3 id="human-readable">Human Readable</h3>

                  <p>Developers should not be required to memorize 256 codes. However, they break nicely into a table.
                      Cognitive load is lowered by organizing the table into categories and reasons.
                      <code class="highlighter-rouge">0x10</code> and <code class="highlighter-rouge">0x11</code> belong to the same category, and <code class="highlighter-rouge">0x04</code> shares a reason with <code class="highlighter-rouge">0x24</code></p>

                  <p>While this repository includes helper enums, we have found working directly in
                      the hex values to be quite natural. ESC <code class="highlighter-rouge">0x10</code> is just as comfortable as HTTP 401, for example.</p>

                  <h3 id="extensiblilty">Extensiblilty</h3>

                  <p>The <code class="highlighter-rouge">0xA</code> category is reserved for application-specific statuses.
                      In the case that 256 codes become insufficient, <code class="highlighter-rouge">bytes1</code> may be embedded in larger byte arrays.</p>

                  <h3 id="evm-codes">EVM Codes</h3>

                  <p>The EVM also returns a status code in transactions; specifically <code class="highlighter-rouge">0x00</code> and <code class="highlighter-rouge">0x01</code>.
                      This proposal both matches the meanings of those two codes, and could later be used
                      at the EVM level.</p>

                  <h3 id="empty-space">Empty Space</h3>

                  <p>Much like how HTTP status codes have large unused ranges, there are totally empty
                      sections in this proposal. The intent is to not impose a complete set of codes up front,
                      and to allow users to suggest uses for these spaces as time progresses.</p>

                  <h3 id="nibble-order">Nibble Order</h3>

                  <p>Nibble order makes no difference to the machine, and is purely mnemonic.
                      This design was originally in opposite order, but changed it for a few convenience factors.
                      Since it’s a different scheme from HTTP, it may feel strange initially,
                      but becomes very natural after a couple hours of use.</p>

                  <h4 id="short-forms">Short Forms</h4>

                  <p>Generic is <code class="highlighter-rouge">0x0_</code>, general codes are consistent with their integer representations</p>

    <pre><code class="language-solidity">hex"1" == hex"01" == 1 // with casting
    </code></pre>

    <h4 id="contract-categories">Contract Categories</h4>

    <p>Many applications will always be part of the same category.
        For instance, validation will generally be in the <code class="highlighter-rouge">0x10</code> range.</p>

    <pre><code class="language-solidity">{`
        contract Whitelist {
        mapping(address =&gt; bool) private whitelist;
        uint256 private deadline;
        byte constant private prefix = hex"10";

        check(address _, address _user) returns (byte _status) {
            if (now &gt;= deadline)  { return prefix | 5; }
            if (whitelist[_user]) { return prefix | 1; }
            return prefix;
        }
        }
        `}
    </code></pre>

    <h4 id="helpers">Helpers</h4>

    <p>This above also means that working with app-specific enums is slightly easier:</p>

    <pre><code class="language-solidity">{`
        enum Sleep {
        Awake,
            Asleep,
            REM,
            FallingAsleep
    }

        // From the helper library

        function appCode(Sleep _state) returns (byte code) {
            return byte(160 + _state); // 160 = 0xA0
        }

        // Versus

        function appCode(Sleep _state) returns (byte code) {
            return byte((16 * _state) + 10); // 10 = 0xA
        }
        `}
    </code></pre>

    <h2 id="implementation">Implementation</h2>

    <p>Reference cases and helper libraries (Solidity and JS) can be found at:</p>
    <ul>
        <li><a href="https://github.com/expede/ethereum-status-codes/">Source Code</a></li>
        <li><a href="https://www.npmjs.com/package/ethereum-status-codes">Package on npm</a></li>
    </ul>

    <h2 id="copyright">Copyright</h2>

    <p>Copyright and related rights waived via <a href="https://creativecommons.org/publicdomain/zero/1.0/">CC0</a>.</p>



    </div>
)

export default IndexPage
