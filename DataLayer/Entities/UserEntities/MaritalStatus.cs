﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataLayer.Entities.UserEntities {
    //public class MaritalStatus {
    //    //married,
    //    //single,
    //    //divorced,
    //    //widow,
    //    //widower,
    //    [Key]
    public class MaritalStatus {

        [Key]
        public int MaritalStatusId {
            get; set;
        }

        public string MaritalStatusName {
            get; set;
        }
    }
}
