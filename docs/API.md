## Functions

<dl>
<dt><a href="#isBlank">isBlank(str)</a> ⇒</dt>
<dd><p>Returns true if the value is falsy or an empty string</p>
</dd>
<dt><a href="#notBlank">notBlank(values)</a> ⇒ <code>Array.&lt;any&gt;</code></dt>
<dd><p>Returns non-blank values</p>
</dd>
<dt><a href="#notEqual">notEqual(values, config)</a> ⇒ <code>Array.&lt;any&gt;</code></dt>
<dd><p>Returns values which do not match the specified value</p>
</dd>
<dt><a href="#replace">replace(values, config)</a> ⇒ <code>Array.&lt;any&gt;</code></dt>
<dd><p>Returns values after replacing the specified pattern with the specified replacement</p>
</dd>
<dt><a href="#anyMatch">anyMatch(values, config)</a></dt>
<dd><p>Returns the match value if the values matches the pattern and the nonMatch value otherwise</p>
</dd>
<dt><a href="#first">first(values)</a></dt>
<dd><p>Gets the first non-blank value</p>
</dd>
<dt><a href="#highest">highest(values)</a></dt>
<dd><p>Gets the highest value by natural sort</p>
</dd>
<dt><a href="#lowest">lowest(values)</a></dt>
<dd><p>Gets the lowest value by natural sort</p>
</dd>
<dt><a href="#unique">unique(values)</a></dt>
<dd><p>Gets the unique values</p>
</dd>
<dt><a href="#alternateValue">alternateValue(record, config)</a></dt>
<dd><p>Returns the value of the alternateField if the value of the testField equals the testValue.
Otherwise returns the value of the defaultField.</p>
</dd>
<dt><a href="#getValue">getValue(record, config)</a></dt>
<dd><p>Returns the value of a different field name than the field to which the data will be saved</p>
</dd>
</dl>

## Typedefs

<dl>
<dt><a href="#MappingFunction">MappingFunction</a> ⇒ <code>Array.&lt;any&gt;</code></dt>
<dd></dd>
<dt><a href="#ReducingFunction">ReducingFunction</a> ⇒ <code>any</code></dt>
<dd></dd>
<dt><a href="#ValueSource">ValueSource</a> ⇒ <code>any</code></dt>
<dd></dd>
<dt><a href="#FieldRule">FieldRule</a></dt>
<dd></dd>
<dt><a href="#NormalizationConfig">NormalizationConfig</a></dt>
<dd></dd>
</dl>

<a name="isBlank"></a>

## isBlank(str) ⇒
Returns true if the value is falsy or an empty string

**Kind**: global function  
**Returns**: true if the value is blank, false otherwise  

| Param | Type | Description |
| --- | --- | --- |
| str | <code>any</code> | the value to check |

<a name="notBlank"></a>

## notBlank(values) ⇒ <code>Array.&lt;any&gt;</code>
Returns non-blank values

**Kind**: global function  

| Param | Type |
| --- | --- |
| values | <code>Array.&lt;any&gt;</code> | 

<a name="notEqual"></a>

## notEqual(values, config) ⇒ <code>Array.&lt;any&gt;</code>
Returns values which do not match the specified value

**Kind**: global function  

| Param | Type |
| --- | --- |
| values | <code>Array.&lt;any&gt;</code> | 
| config | <code>Object</code> | 

<a name="replace"></a>

## replace(values, config) ⇒ <code>Array.&lt;any&gt;</code>
Returns values after replacing the specified pattern with the specified replacement

**Kind**: global function  

| Param | Type |
| --- | --- |
| values | <code>Array.&lt;any&gt;</code> | 
| config | <code>Object</code> | 

<a name="anyMatch"></a>

## anyMatch(values, config)
Returns the match value if the values matches the pattern and the nonMatch value otherwise

**Kind**: global function  

| Param | Type |
| --- | --- |
| values | <code>Array.&lt;any&gt;</code> | 
| config | <code>Object</code> | 

<a name="first"></a>

## first(values)
Gets the first non-blank value

**Kind**: global function  

| Param | Type |
| --- | --- |
| values | <code>Array.&lt;any&gt;</code> | 

<a name="highest"></a>

## highest(values)
Gets the highest value by natural sort

**Kind**: global function  

| Param | Type |
| --- | --- |
| values | <code>Array.&lt;any&gt;</code> | 

<a name="lowest"></a>

## lowest(values)
Gets the lowest value by natural sort

**Kind**: global function  

| Param | Type |
| --- | --- |
| values | <code>Array</code> | 

<a name="unique"></a>

## unique(values)
Gets the unique values

**Kind**: global function  

| Param | Type |
| --- | --- |
| values | <code>Array</code> | 

<a name="alternateValue"></a>

## alternateValue(record, config)
Returns the value of the alternateField if the value of the testField equals the testValue.
Otherwise returns the value of the defaultField.

**Kind**: global function  

| Param | Type |
| --- | --- |
| record | <code>Record.&lt;string, any&gt;</code> | 
| config | <code>Object</code> | 

<a name="getValue"></a>

## getValue(record, config)
Returns the value of a different field name than the field to which the data will be saved

**Kind**: global function  

| Param | Type |
| --- | --- |
| record | <code>Record.&lt;string, any&gt;</code> | 
| config | <code>Object</code> | 

<a name="MappingFunction"></a>

## MappingFunction ⇒ <code>Array.&lt;any&gt;</code>
**Kind**: global typedef  
**Returns**: <code>Array.&lt;any&gt;</code> - the mapped value  

| Param | Type | Description |
| --- | --- | --- |
| values | <code>Array.&lt;any&gt;</code> | the values to map |
| config | <code>any</code> | the configuration provided for the mapper |

<a name="ReducingFunction"></a>

## ReducingFunction ⇒ <code>any</code>
**Kind**: global typedef  
**Returns**: <code>any</code> - the reduced value  

| Param | Type | Description |
| --- | --- | --- |
| values | <code>Array.&lt;any&gt;</code> | the values to reduce |
| config | <code>any</code> | the configuration provided for the reducer |

<a name="ValueSource"></a>

## ValueSource ⇒ <code>any</code>
**Kind**: global typedef  
**Returns**: <code>any</code> - the extracted value  

| Param | Type | Description |
| --- | --- | --- |
| record | <code>Record.&lt;string, any&gt;</code> | the record from which to extract the value |
| [config] | <code>any</code> | the configuration for the function |

<a name="FieldRule"></a>

## FieldRule
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| reducer | <code>string</code> \| <code>Object</code> | the name of the reducer function to execute on the field |
| [mappers] | <code>Array.&lt;(string\|Object)&gt;</code> | the mapping functions to execute on this field |
| [source] | <code>string</code> \| <code>Object</code> | the function to retrieve the value for the field |

<a name="NormalizationConfig"></a>

## NormalizationConfig
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| primaryKey | <code>string</code> | the primary key for performing the merging |
| primarySources | <code>Array.&lt;string&gt;</code> | the source fields to retrieve the primary key |
| fieldRules | <code>Record.&lt;string, FieldRule&gt;</code> | the rules for how to normalize each field |

