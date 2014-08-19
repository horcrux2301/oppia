// Copyright 2014 The Oppia Authors. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS-IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * @fileoverview Controllers for the form builder test page.
 *
 * @author sll@google.com (Sean Lip)
 */

oppia.controller('FormBuilderTests', [
    '$scope', 'parameterSpecsService', function($scope, parameterSpecsService) {
  parameterSpecsService.addParamSpec('paramBool1', 'bool');
  parameterSpecsService.addParamSpec('paramBool2', 'bool');
  parameterSpecsService.addParamSpec('paramInt1', 'int');
  parameterSpecsService.addParamSpec('paramFloat1', 'float');
  parameterSpecsService.addParamSpec('paramFloat2', 'float');
  parameterSpecsService.addParamSpec('paramUnicode1', 'unicode');
  parameterSpecsService.addParamSpec('paramUnicode2', 'unicode');
  parameterSpecsService.addParamSpec('paramUnicode3', 'unicode');

  $scope.testText = 'abc{{paramUnicode1}}';

  $scope.unicodeForm = {
    schema: {
      type: 'unicode'
    },
    value: 'aab{{paramUnicode1}}'
  };

  $scope.booleanForms = [{
    name: 'Boolean form',
    schema: {
      type: 'bool'
    },
    value: true
  }, {
    name: 'Boolean form with parameters',
    schema: {
      type: 'bool',
      allow_parameters: true
    },
    value: 'paramBool1'
  }];

  $scope.intForms = [{
    name: 'Integer form (no parameters)',
    schema: {
      type: 'int'
    },
    value: 3
  }, {
    // TODO(sll): Add test for bad initialization.
    name: 'Integer form with parameters',
    schema: {
      type: 'int',
      allow_parameters: true
    },
    value: 'paramInt1'
  }];

  $scope.floatForms = [{
    name: 'Float form (value must be between -3 and 6)',
    schema: {
      type: 'float',
      post_normalizers: [{
        id: 'require_at_least',
        min_value: -3.0
      }, {
        id: 'require_at_most',
        max_value: 6.0
      }]
    },
    value: 3.14
  }, {
    name: 'Float form with parameters (value must be between -3 and 6)',
    schema: {
      type: 'float',
      allow_parameters: true,
      post_normalizers: [{
        id: 'require_at_least',
        min_value: -3.0
      }, {
        id: 'require_at_most',
        max_value: 6.0
      }]
    },
    value: 3.14
  }];

  $scope.unicodeForms = [{
    name: 'Restricted unicode form; the value must be either a or b.',
    schema: {
      type: 'unicode',
      choices: ['a', 'b']
    },
    value: 'a'
  }];

  $scope.htmlForms = [{
    name: 'HTML form',
    schema: {
      type: 'html'
    },
    value: 'Some <b>HTML</b>'
  }];

  $scope.compositeForms = [{
    name: 'Dict with a bool, a unicode string and a list of ints. The string must be either \'abc\' or \'def\'.',
    schema: {
      type: 'dict',
      properties: [{
        name: 'a_unicode_string_appearing_first',
        description: 'First field.',
        schema: {
          type: 'unicode',
          choices: ['abc', 'def']
        }
      }, {
        name: 'a_list_appearing_second',
        description: 'Second field.',
        schema: {
          type: 'list',
          items: {
            type: 'int'
          }
        }
      }, {
        name: 'a_boolean_appearing_last',
        description: 'Third field.',
        schema: {
          type: 'bool'
        }
      }]
    },
    value: {
      a_boolean_appearing_last: false,
      a_unicode_string_appearing_first: 'abc',
      a_list_appearing_second: [2, 3]
    }
  }, {
    name: 'List of unicode textareas with custom \'add element\' text',
    schema: {
      type: 'list',
      items: {
        type: 'unicode',
        ui_config: {
          rows: 5
        }
      },
      ui_config: {
        add_element_text: '[Custom \'add element\' text]'
      }
    },
    value: ['abc', 'def', 'ghi']
  }, {
    name: 'Fixed-length list of 2 multiple-choice floats',
    schema: {
      type: 'list',
      items: {
        type: 'float',
        choices: [1.0, 0.0, -1.0, -2.0, -3.0]
      },
      len: 2
    },
    value: [1.0, -3.0]
  }, {
    name: 'List of complex items (no descriptions in the dicts)',
    schema: {
      type: 'list',
      items: {
        type: 'dict',
        properties: [{
          name: 'intField',
          schema: {
            type: 'int',
          }
        }, {
          name: 'htmlField',
          schema: {
            type: 'html'
          }
        }]
      }
    },
    value: [{
      intField: 5,
      htmlField: '<span><b>d</b>ef</span>'
    }]
  }, {
    name: 'Nested lists',
    schema: {
      type: 'list',
      items: {
        type: 'list',
        items: {
          type: 'unicode'
        }
      }
    },
    value: [['abc'], ['def', 'ghi']]
  }];

  $scope.formsets = [{
    name: 'Boolean editors',
    forms: $scope.booleanForms
  }, {
    name: 'Integer editors',
    forms: $scope.intForms
  }, {
    name: 'Float editors',
    forms: $scope.floatForms
  }, {
    name: 'Unicode editors',
    forms: $scope.unicodeForms
  }, {
    name: 'HTML editors',
    forms: $scope.htmlForms
  }, {
    name: 'Composite editors',
    forms: $scope.compositeForms
  }];
}]);
