module.exports = {
  sucsees: (data) => {
    return {
       sucsees:true,
       data:data
    };
  },

  error: (message) => {
    return {
      sucsees:false,
      error:message
      
    };
  },
};
