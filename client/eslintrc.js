module.exports = {
  parser:'@typescript-eslint/parser',
  extends:['plugin:@typescript-eslint/recommended', 'react-app','prettier'],
  rules:{
    'react/jsx-filename-extention':[
      1,{extensions:['.js','.jsx','.tsx','.ts']}
    ],
    '@typescript-eslint/indent':0,
    '@typescript-eslint/no-empty-interface':0,
    'import/first':0
  }
}